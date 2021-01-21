using Domain.Lists;
using Domain.Models;
using Microsoft.AspNetCore.SignalR;
using System.Linq;
using System.Threading.Tasks;

namespace Presentation.Hubs
{
    public class GameCreatorHub : Hub
    {

        public async Task GetMatchListItems()
        {
            await Clients.Client(Context.ConnectionId).SendAsync("RecieveAndRenderListOfMatches", MatchListItems.Matches);
        }

        public async Task TryJoinMatch(string id, string password)
        {
            MatchListItem match = MatchListItems.Matches.FirstOrDefault(x => x.Id == id);

            bool isPasswordCorrect = (match.Password == password) ? true : false;
            if (isPasswordCorrect)
            {
                await Clients.Caller.SendAsync("RecieveMatchUrl", match.Url);
            }
            else
            {
                await Clients.Caller.SendAsync("SendNotificationAboutIncorrectPassword");
            }
        }

        public async Task CreateMatch(MatchListItem match)
        {
            bool matchDoesNotExist = (MatchListItems.Matches.FirstOrDefault(x => x.Id == match.Id) == null) ? true : false;

            if (matchDoesNotExist)
            {
                MatchListItems.Matches.Add(match);
            }
        }
    }
}
