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


        public async Task TryJoinGame(string groupName)
        {
            _groups.Add(Context.ConnectionId, groupName);
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

            IEnumerable<KeyValuePair<string, string>> connectionsInCurrentGroup = _groups.Where(x => x.Value == groupName);
            bool groupHasTwoPlayers = (connectionsInCurrentGroup.Count() == 2) ? true : false;
            if (groupHasTwoPlayers)
            {
                 string[] turnOrder =  GetTurnOrder(connectionsInCurrentGroup);
                 await GetTheGameReadyToStart(turnOrder);
            }
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

        public async Task GetTheGameReadyToStart(string[] turnOrder)
        {
            string firstTurnPlayerId = turnOrder[0];
            string secondTurnPlayerId = turnOrder[1];

            await Clients.Client(firstTurnPlayerId).SendAsync("GivePermisionToStartTheGame");
            await Clients.Client(secondTurnPlayerId).SendAsync("ChangeGameStatusToWaitForStart");          
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
