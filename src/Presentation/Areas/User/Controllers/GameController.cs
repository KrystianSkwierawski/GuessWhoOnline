using Applciation.ViewModel;
using Application.Characters.Queries;
using Application.MatchListItems.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Diagnostics;
using System.Threading.Tasks;

namespace Presentation.Areas.User.Controllers
{
    [Area("User")]
    public class GameController : BaseController
    {
        private IMediator _mediator;

        public GameController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [Route("game/{id}", Name = "Game")]
        public async Task<IActionResult> Index(string id)
        {
            int numberOfConnections = await _mediator.Send(new GetNumberOfConnectionsInMatchListItemQuery()
            {
                Url = id
            });

            List<string> characterNames = await _mediator.Send(new GetCharacterNamesQuery());

            GameViewModel gameViewModel = new GameViewModel
            {
                Id = id,
                CharactersNames = characterNames,
                NumberOfConnections = numberOfConnections
            };

            return View("Index", gameViewModel);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
