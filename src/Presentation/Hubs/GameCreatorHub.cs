using Application.MatchListItems.Commands;
using Application.MatchListItems.Queries;
using Application.Models;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Presentation.Hubs
{
    public class GameCreatorHub : Hub
    {
        private IMediator _mediator;

        public GameCreatorHub(IMediator mediator)
        {
            _mediator = mediator;
        }

        public async Task GetMatchListItems()
        {
            List<MatchListItem> matches = await _mediator.Send(new GetMatchListItemsQuery());
            await Clients.Client(Context.ConnectionId).SendAsync("RecieveAndRenderListOfMatches", matches);
        }

        public async Task TryJoinMatch(string id, string password)
        {
            MatchListItem match = await _mediator.Send(new GetMatchListItemQuery
            {
                Id = id
            });

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
            bool matchExist = await _mediator.Send(new CheckIfMatchListItemExistQuery
            {
                Id = match.Id
            });

            if (!matchExist)
            {
                await _mediator.Send(new AddMatchListItemCommand());
            }
        }
    }
}
