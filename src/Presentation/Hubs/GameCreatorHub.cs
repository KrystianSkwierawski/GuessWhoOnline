<<<<<<< HEAD
﻿using Application.MatchListItems.Commands;
using Application.MatchListItems.Queries;
using Application.Models;
using MediatR;
=======
﻿using Application.Common.Interfaces;
using Application.Common.Models;
using Infrastructure.Services;
>>>>>>> master
using Microsoft.AspNetCore.SignalR;
using System.Linq;
using System.Threading.Tasks;

namespace Presentation.Hubs
{
    public class GameCreatorHub : Hub
    {
        IMatchListItemsService _matchListItemsService;

        public GameCreatorHub(IMatchListItemsService matchListItemsService)
        {
            _matchListItemsService = matchListItemsService;
        }

        public async Task GetMatchListItems()
        {
            await Clients.Client(Context.ConnectionId).SendAsync("RecieveAndRenderListOfMatches", _matchListItemsService.GetAll());
        }

        public async Task TryJoinMatch(string id, string password)
        {
            MatchListItem match = _matchListItemsService.GetMatchById(id);

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
            bool matchDoesNotExist = (_matchListItemsService.GetAll().FirstOrDefault(x => x.Id == match.Id) == null) ? true : false;

            if (matchDoesNotExist)
            {
                _matchListItemsService.AddMatchListItem(match);
            }
        }
    }
}
