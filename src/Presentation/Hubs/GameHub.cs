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
                Game game = _games.FirstOrDefault(x => x.Id == groupName);

                if (game == null)
                {
                    game = await CreateGame(groupName);

                    SetGameToCharacterSelect(game);
                }
                else if (game != null && game.Status != GameStatus.Ended)
                {
                    ReconnectToTheGame(game);
                }
            }
        }

        private async Task SetGameToCharacterSelect(Game game)
        {
            game.Status = GameStatus.CharacterSelect;
            Clients.Group(game.Id).SendAsync("ActivateChatCommunicator");
            await Clients.Group(game.Id).SendAsync("RecieveGameStatus", game.Status);
            await Clients.Group(game.Id).SendAsync("ActivateGameBoard");
        }

        private async Task ReconnectToTheGame(Game game)
        {
            await AddUserInformationsToTheGame(game);

            if (game.Status == GameStatus.CharacterSelect)
            {
                SetGameToCharacterSelect(game);
            }
            else if (game.Status == GameStatus.Started)
            {
                string currentUserCharacter = (game.FirstTurnPlayerId == Context.ConnectionId) ? game.FirstTurnPlayerCharacter : game.SecondTurnPlayerCharacter;
                ResumeTheGame(game, currentUserCharacter);
            }
            else if (game.Status == GameStatus.WaitForStart)
            {
                SetGameToWaitForStart(game);
            }

            Clients.Group(game.Id).SendAsync("RemoveNotificationAboutPauseTheGame");
            Clients.Group(game.Id).SendAsync("ActivateGameBoard");
            Clients.Group(game.Id).SendAsync("ActivateChatCommunicator");
        }

        private async Task ResumeTheGame(Game game, string currentUserCharacter)
        {
            Clients.Client(Context.ConnectionId).SendAsync("SetYourCharacter", currentUserCharacter);

            Clients.Client(game.NextTurnPlayerId).SendAsync("DisableGamePanel");
            Clients.Client(game.NextTurnPlayerId).SendAsync("RecieveGameStatus", GameStatus.EnemyTurn);

            Clients.Client(game.CurrentTurnPlayerId).SendAsync("ActivateGamePanel");
            Clients.Client(game.CurrentTurnPlayerId).SendAsync("RecieveGameStatus", GameStatus.YourTurn);

            Clients.Group(game.Id).SendAsync("ResetTimer");
            Clients.Group(game.Id).SendAsync("StartTimer");
        }

        public async Task VoteToRestartGame()
        {
            Game game = _games.FirstOrDefault(x => x.FirstTurnPlayerId == Context.ConnectionId || x.SecondTurnPlayerId == Context.ConnectionId);

            game.VotesToRestartGame++;

            bool bothPlayersVotedToRestartGame = (game.VotesToRestartGame == 2) ? true : false;
            if (bothPlayersVotedToRestartGame)
            {
                await RestartGameSettings(game);
                await SetGameToCharacterSelect(game);
            }
        }

        private async Task RestartGameSettings(Game game)
        {
            IEnumerable<KeyValuePair<string, string>> connectionsInCurrentGroup = _groups.Where(x => x.Value == game.Id);
            string[] turnOrder = GetTurnOrder(connectionsInCurrentGroup);

            game.CurrentTurnPlayerId = turnOrder[0];
            game.NextTurnPlayerId = turnOrder[1];
            game.FirstTurnPlayerCharacter = null;
            game.SecondTurnPlayerCharacter = null;
            game.VotesToRestartGame = 0;

            Clients.Group(game.Id).SendAsync("RestartGameBoard");
            Clients.Group(game.Id).SendAsync("RestartGamePanel");
            Clients.Group(game.Id).SendAsync("RemoveEndGameNotification");
            Clients.Group(game.Id).SendAsync("ResetTimer");
        }

        private async Task AddUserInformationsToTheGame(Game game)
        {
            if (game.FirstTurnPlayerId == null)
            {
                game.FirstTurnPlayerId = Context.ConnectionId;
            }
            else if (game.SecondTurnPlayerId == null)
            {
                game.SecondTurnPlayerId = Context.ConnectionId;
            }

            if (game.CurrentTurnPlayerId == null)
            {
                game.CurrentTurnPlayerId = Context.ConnectionId;
            }
            else if (game.NextTurnPlayerId == null)
            {
                game.NextTurnPlayerId = Context.ConnectionId;
            }
        }

        public async Task StartTheGame()
        {
            Game game = _games.FirstOrDefault(x => x.FirstTurnPlayerId == Context.ConnectionId || x.SecondTurnPlayerId == Context.ConnectionId);
            string groupName = _groups[Context.ConnectionId];

            if (groupName != null)
            {
                game.Status = GameStatus.Started;

                Task recieveGameStatusFirstTurnPlayerTask = Clients.Client(game.FirstTurnPlayerId).SendAsync("RecieveGameStatus", GameStatus.YourTurn);
                Task activeGamePanelFirstPlayerTask = Clients.Client(game.FirstTurnPlayerId).SendAsync("ActivateGamePanel");

                Task recieveGameStatusSecondPlayerTask = Clients.Client(game.SecondTurnPlayerId).SendAsync("RecieveGameStatus", GameStatus.EnemyTurn);
                Task showGameStatusSecondPlayerTask = Clients.Client(game.SecondTurnPlayerId).SendAsync("ShowGameStatus");
                Task hideStartGameButtonSecondPlayerTask = Clients.Client(game.SecondTurnPlayerId).SendAsync("HideStartGameButton");

                Task activeGameBoardTask = Clients.Group(groupName).SendAsync("ActivateGameBoard");

                game.CurrentTurnPlayerId = game.FirstTurnPlayerId;
                game.NextTurnPlayerId = game.SecondTurnPlayerId;

                List<Task> startGameTasks = new List<Task> { recieveGameStatusFirstTurnPlayerTask, activeGamePanelFirstPlayerTask, recieveGameStatusSecondPlayerTask, showGameStatusSecondPlayerTask, hideStartGameButtonSecondPlayerTask, activeGameBoardTask };

                await Task.WhenAll(startGameTasks);

                await Clients.Group(groupName).SendAsync("StartTimer");
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
                Status = GameStatus.CharacterSelect,
                VotesToRestartGame = 0
            };

            _games.Add(game);

            return game;
        }
        private async Task SetGameToWaitForStart(Game game)
        {
            game.Status = GameStatus.WaitForStart;
            await Clients.Client(game.SecondTurnPlayerId).SendAsync("GivePermisionToStartTheGame");
            await Clients.Client(game.FirstTurnPlayerId).SendAsync("RecieveGameStatus", GameStatus.WaitForStart);
        }

        public async Task SelectCharacter(string gameId, string characterName)
        {
            Game game = _games.FirstOrDefault(x => x.Id == gameId);

            if (game == null)
                return;

            //set player character
            if (game.FirstTurnPlayerId == Context.ConnectionId)
            {
                game.FirstTurnPlayerCharacter = characterName;
            }
            else if (game.SecondTurnPlayerId == Context.ConnectionId)
            {
                game.SecondTurnPlayerCharacter = characterName;
            }

            bool bothPlayersSelectedCharacter = (game.FirstTurnPlayerCharacter != null && game.SecondTurnPlayerCharacter != null);
            if (bothPlayersSelectedCharacter)
            {
                SetGameToWaitForStart(game);
            }
            else //only one player selected character
            {
                Clients.Client(Context.ConnectionId).SendAsync("RecieveGameStatus", GameStatus.EnemyIsSelectingCharacter);
            }

            Clients.Clients(Context.ConnectionId).SendAsync("SetYourCharacter", characterName);
            Clients.Client(Context.ConnectionId).SendAsync("DisableGameBoard");
        }

        public async Task FinishTheTurn()
        {
            Game game = _games.FirstOrDefault(x => x.FirstTurnPlayerId == Context.ConnectionId || x.SecondTurnPlayerId == Context.ConnectionId);

            if (game == null)
                return;

            if (game.CurrentTurnPlayerId == Context.ConnectionId)
            {
                await ChangeTurn(game);
                await Clients.Group(game.Id).SendAsync("PlayEndTurnSound");
            }
        }

        public async Task ChangeTurn(Game game)
        {
            Clients.Client(game.CurrentTurnPlayerId).SendAsync("DisableGamePanel");
            Clients.Client(game.CurrentTurnPlayerId).SendAsync("RecieveGameStatus", GameStatus.EnemyTurn);

            Clients.Client(game.NextTurnPlayerId).SendAsync("ActivateGamePanel");
            Clients.Client(game.NextTurnPlayerId).SendAsync("RecieveGameStatus", GameStatus.YourTurn);

            Clients.Group(game.Id).SendAsync("ResetTimer");

            (game.CurrentTurnPlayerId, game.NextTurnPlayerId) = (game.NextTurnPlayerId, game.CurrentTurnPlayerId);
        }

        public async Task CheckCharacterTypeAndEndTheGame(string characterType)
        {
            Game game = _games.FirstOrDefault(x => x.FirstTurnPlayerId == Context.ConnectionId || x.SecondTurnPlayerId == Context.ConnectionId);

            if (game == null)
                return;

            string currentTurnPlayerCharacter = (game.CurrentTurnPlayerId == game.FirstTurnPlayerId) ? game.FirstTurnPlayerCharacter : game.SecondTurnPlayerCharacter;
            string nextTurnPlayerCharacter = (game.NextTurnPlayerId == game.FirstTurnPlayerId) ? game.FirstTurnPlayerCharacter : game.SecondTurnPlayerCharacter;

            SendNotificationsToWinnerAndLoserAboutEndOfTheGame(game, currentTurnPlayerCharacter, nextTurnPlayerCharacter, characterType);

            Clients.Group(game.Id).SendAsync("StopTimer");
            Clients.Group(game.Id).SendAsync("DisableGameBoard");
            Clients.Group(game.Id).SendAsync("DisableGamePanel");

            game.Status = GameStatus.Ended;
        }

        public async Task SendNotificationsToWinnerAndLoserAboutEndOfTheGame(Game game, string currentTurnPlayerCharacter, string nextTurnPlayerCharacter, string characterType)
        {
            string loser = null, winner = null;
            string currentTurnPlayerStatus = "", nextTurnPlayerStatus = "";

            bool correctAnswer = (nextTurnPlayerCharacter == characterType) ? true : false;

            if (correctAnswer)
            {
                winner = game.CurrentTurnPlayerId;
                loser = game.NextTurnPlayerId;
                currentTurnPlayerStatus = $"You win! Enemy character was {nextTurnPlayerCharacter}";
                nextTurnPlayerStatus = $"You lose! Enemy character was {currentTurnPlayerCharacter}";
            }
            else if (!correctAnswer)
            {
                winner = game.NextTurnPlayerId;
                loser = game.CurrentTurnPlayerId;
                currentTurnPlayerStatus = $"You lose! Enemy character was {nextTurnPlayerCharacter}";
                nextTurnPlayerStatus = $"You win! Enemy character was {currentTurnPlayerCharacter}";
            }

            Clients.Clients(winner).SendAsync("PlayWinSound");
            Clients.Clients(loser).SendAsync("PlayLoseSound");

            Clients.Clients(game.CurrentTurnPlayerId).SendAsync("ShowNotificationAboutEndOfTheGame", currentTurnPlayerStatus, nextTurnPlayerCharacter);
            Clients.Clients(game.NextTurnPlayerId).SendAsync("ShowNotificationAboutEndOfTheGame", nextTurnPlayerStatus, currentTurnPlayerCharacter);
        }

        public async Task SendMessageToEnemy(string message)
        {
            Game game = _games.FirstOrDefault(x => x.FirstTurnPlayerId == Context.ConnectionId || x.SecondTurnPlayerId == Context.ConnectionId);

            if (game == null)
                return;

            string enemyConnectionId = (game.FirstTurnPlayerId == Context.ConnectionId) ? game.SecondTurnPlayerId : game.FirstTurnPlayerId;
            await Clients.Clients(enemyConnectionId).SendAsync("RecieveEnemyMessage", message);
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
            LeaveOrRemoveGame();
            await LeaveGroupIfGamesContainsConnectionId();

            await base.OnDisconnectedAsync(exception);
        }

        private async Task LeaveOrRemoveGame()
        {
            Game game = _games.FirstOrDefault(x => x.FirstTurnPlayerId == Context.ConnectionId || x.SecondTurnPlayerId == Context.ConnectionId);

            if (game == null)
                return;

            await LeaveTheGame(game);

            bool bothPlayersLeftTheGame = (game.FirstTurnPlayerId == null && game.SecondTurnPlayerId == null) ? true : false;
            if (bothPlayersLeftTheGame)
            {
                _games.Remove(game);
            }
            else if (!bothPlayersLeftTheGame && game.Status != GameStatus.Ended)
            {
                PuaseTheGame(game);
            }
        }

        private async Task PuaseTheGame(Game game)
        {
            Clients.Group(game.Id).SendAsync("StopTimer");
            Clients.Group(game.Id).SendAsync("DisableGameBoard");
            Clients.Group(game.Id).SendAsync("DisableGamePanel");
            Clients.Group(game.Id).SendAsync("StopTimer");
            Clients.Group(game.Id).SendAsync("SendNotificationAboutPauseTheGame");
            Clients.Group(game.Id).SendAsync("RecieveGameStatus", GameStatus.Paused);
        }

        private async Task LeaveTheGame(Game game)
        {
            //change current user information in game to null
            if (Context.ConnectionId == game.FirstTurnPlayerId)
            {
                if (game.CurrentTurnPlayerId == game.FirstTurnPlayerId)
                {
                    game.CurrentTurnPlayerId = null;
                }
                else if (game.NextTurnPlayerId == game.FirstTurnPlayerId)
                {
                    game.NextTurnPlayerId = null;
                }

                game.FirstTurnPlayerId = null;
            }
            else if (Context.ConnectionId == game.SecondTurnPlayerId)
            {
                if (game.CurrentTurnPlayerId == game.SecondTurnPlayerId)
                {
                    game.CurrentTurnPlayerId = null;
                }
                else if (game.NextTurnPlayerId == game.SecondTurnPlayerId)
                {
                    game.NextTurnPlayerId = null;
                }

                game.SecondTurnPlayerId = null;
            }
        }


        private async Task LeaveGroupIfGamesContainsConnectionId()
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
