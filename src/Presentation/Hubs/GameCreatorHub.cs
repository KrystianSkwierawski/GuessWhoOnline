using Application.Common.Models;
using Application.MatchListItems.Commands;
using Application.MatchListItems.Queries;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Presentation.Hubs
{
    public class GameCreatorHub : Hub
    {
        readonly IMediator _mediator;

        public GameCreatorHub(IMediator mediator)
        {
            _mediator = mediator;
        }

        public async Task GetMatchListItems()
        {
            await _mediator.Send(new RemoveEmptyMatchesCommand());

            List<MatchListItem> matchListItems = await _mediator.Send(new GetAllMatchListItemsQuery());

            await Clients.Client(Context.ConnectionId).SendAsync("RecieveAndRenderListOfMatches", matchListItems);
        }

        public async Task TryJoinMatch(string id, string password)
        {
            MatchListItem match = await _mediator.Send(new GetMatchByIdQuery { Id = id });

            bool isPasswordCorrect = match.Password == password;
            if (isPasswordCorrect)
            {
                await Clients.Caller.SendAsync("RecieveMatchUrl", match.Url);
                return;
            }

            await Clients.Caller.SendAsync("SendNotificationAboutIncorrectPassword");
        }

        public async Task CreateMatch(MatchListItem match)
        {
            List<MatchListItem> matchListItems = await _mediator.Send(new GetAllMatchListItemsQuery());
            bool matchDoesNotExist = matchListItems.FirstOrDefault(x => x.Id == match.Id) == null;

            if (matchDoesNotExist)
            {
                _mediator.Send(new AddMatchListItemCommand { MatchListItem = match });
            }
        }
    }
}
