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
        static List<Game> _games = new List<Game>();


        public override async Task OnConnectedAsync()
        {
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
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
            bool gameDoesNotExist = (_games.FirstOrDefault(x => x.Id == game.Id) == null) ? true : false;

            if (gameDoesNotExist)
            {
                _games.Add(game);
            }          
        }
    }
}
