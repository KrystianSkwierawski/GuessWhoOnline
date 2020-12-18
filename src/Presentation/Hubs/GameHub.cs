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
        static List<HubCallerContext> _connections = new List<HubCallerContext>();
        static List<Game> _games = new List<Game>();


        public override async Task OnConnectedAsync()
        {
            _connections.Add(Context);

            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            TryRemoveConnection();


            await base.OnDisconnectedAsync(exception);
        }

        public async Task GetListOfGames()
        {
            if (_games.Count > 0)
            {
                await Clients.Client(Context.ConnectionId).SendAsync("RecieveAndRenderListOfMatches", _games);
            }
        }

        public async Task CreateGame(string id, string name, string password)
        {
            Game game = new Game
            {
                Id = id,
                Name = name,
                Password = password,
                HostPlayerConnectionId = Context.ConnectionId
            };

            _games.Add(game);
        }


        private void TryRemoveConnection()
        {
            HubCallerContext connection = _connections.FirstOrDefault(x => x.UserIdentifier == Context.UserIdentifier);

            if (connection != null)
            {
                _connections.Remove(connection);
            }
        }
    }
}
