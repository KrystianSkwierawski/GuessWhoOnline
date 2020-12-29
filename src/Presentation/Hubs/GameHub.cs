using Domain.Models;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Presentation.Hubs
{
    public class GameHub : Hub
    {
        static Dictionary<string, string> _groups = new Dictionary<string, string>();
        static List<Game> _games = new List<Game>();


        public async Task TryJoinGame(string groupName)
        {
            _groups.Add(Context.ConnectionId, groupName);
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

            int numberOfConnectionsInCurrentGroup = _groups.Where(x => x.Value == groupName).Count();
            bool groupHasTwoPlayers = (numberOfConnectionsInCurrentGroup == 2) ? true : false;
            if (groupHasTwoPlayers)
            {
                Game game = await CreateGame(groupName);
                await Clients.Group(game.Id).SendAsync("RecieveGameStatus", game.Status);
                await Clients.Group(game.Id).SendAsync("ActivateGameBoard", game.Status);
            }
        }

        private async Task<Game> CreateGame(string groupId)
        {
            IEnumerable<KeyValuePair<string, string>> connectionsInCurrentGroup = _groups.Where(x => x.Value == groupId);
            string[] turnOrder = GetTurnOrder(connectionsInCurrentGroup);

            Game game = new Game
            {
                Id = groupId,
                FirstTurnPlayerId = turnOrder[0],
                SecondTurnPlayerId = turnOrder[1],
                Status = GameStatus.CharacterSelect
            };

            _games.Add(game);

            return game;
        }

        public async Task SelectCharacter(string gameId, string characterName)
        {
            Game game = _games.FirstOrDefault(x => x.Id == gameId);

            //set player character
            if(game.FirstTurnPlayerId == Context.ConnectionId)
            {
                game.FirstTurnPlayerCharacter = characterName;
            }
            else if(game.SecondTurnPlayerId == Context.ConnectionId)
            {
                game.SecondTurnPlayerCharacter = characterName;
            }

            bool bothPlayersSelectedCharacter = (game.FirstTurnPlayerCharacter != null && game.SecondTurnPlayerCharacter != null);
            if (bothPlayersSelectedCharacter)
            {
                await Clients.Client(game.FirstTurnPlayerId).SendAsync("GivePermisionToStartTheGame");
                await Clients.Client(game.SecondTurnPlayerId).SendAsync("RecieveGameStatus", GameStatus.WaitForStart);
            }
            else
            {
                await Clients.Client(Context.ConnectionId).SendAsync("RecieveGameStatus", GameStatus.EnemyIsSelectingCharacter);
            }

            await Clients.Client(Context.ConnectionId).SendAsync("DisableGameBoard");
        }

        public string[] GetTurnOrder(IEnumerable<KeyValuePair<string, string>> connectionsInCurrentGame)
        {
            string[] o_turnOrder = new string[2];
            int firstTurnPlayerIndex = new Random().Next(0, connectionsInCurrentGame.Count());

            string firstTurnPlayerId = connectionsInCurrentGame.ElementAt(firstTurnPlayerIndex).Key;
            string secondTurnPlayerId = connectionsInCurrentGame.FirstOrDefault(x => x.Key != firstTurnPlayerId).Key;


            o_turnOrder[0] = firstTurnPlayerId;
            o_turnOrder[1] = secondTurnPlayerId;

            return o_turnOrder;
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await LeaveGameIfGamesContainsConnectionId();

            await base.OnDisconnectedAsync(exception);
        }

        private async Task LeaveGameIfGamesContainsConnectionId()
        {
            bool groupExist = CheckIfGroupExist(Context.ConnectionId);

            if (groupExist)
            {
                string groupName = _groups[Context.ConnectionId];
                _groups.Remove(Context.ConnectionId);

                await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
            }
        }

        private bool CheckIfGroupExist(string connectionId)
        {
            return _groups.ContainsKey(connectionId) ? true : false;
        }
    }
}
