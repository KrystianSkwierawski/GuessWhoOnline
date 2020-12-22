using Domain.Models;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Presentation.Hubs
{
    public class GameCreatorHub : Hub
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

        public async Task TryJoinMatch(string id, string password)
        {
            Game game = _games.FirstOrDefault(x => x.Id == id);

            bool isPasswordCorrect = (game.Password == password) ? true : false;
            if (isPasswordCorrect)
            {
                await Clients.Caller.SendAsync("RecieveGameUrl", game.Url);
            }
            else
            {
                await Clients.Caller.SendAsync("DisplayNotification");
            }
        }

        public async Task CreateGame(Game game)
        {

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
