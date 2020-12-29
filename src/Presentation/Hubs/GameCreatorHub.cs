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
        static List<MatchListItem> _matchListItems = new List<MatchListItem>();

        public async Task GetMatchListItems()
        {
            if (_matchListItems.Count > 0)
            {
                await Clients.Client(Context.ConnectionId).SendAsync("RecieveAndRenderListOfMatches", _matchListItems);
            }
        }

        public async Task TryJoinMatch(string id, string password)
        {
            MatchListItem match = _matchListItems.FirstOrDefault(x => x.Id == id);

            bool isPasswordCorrect = (match.Password == password) ? true : false;
            if (isPasswordCorrect)
            {
                await Clients.Caller.SendAsync("RecieveMatchUrl", match.Url);
            }
            else
            {
                await Clients.Caller.SendAsync("DisplayNotification");
            }
        }

        public async Task CreateMatch(MatchListItem match)
        {
            bool matchDoesNotExist = (_matchListItems.FirstOrDefault(x => x.Id == match.Id) == null) ? true : false;

            if (matchDoesNotExist)
            {
                _matchListItems.Add(match);
            }          
        }
    }
}
