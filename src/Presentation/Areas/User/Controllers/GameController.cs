using Applciation.Common.ViewModel;
using Application.CharacterNames.Queries;
using Application.MatchListItems.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Threading.Tasks;

namespace Presentation.Areas.User.Controllers
{
    [Area("User")]
    public class GameController : BaseController
    {
        readonly IMediator _mediator;

        public GameController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [Route("game/{id}", Name = "Game")]
        public async Task<IActionResult> Index(string id)
        {
            GameViewModel gameViewModel = new GameViewModel
            {
                Id = id,
                CharactersNames = await _mediator.Send(new GetCharacterNamesQuery()),
                NumberOfConnections = await _mediator.Send(new GetNumberOfConnectionsByUrlQuery { Url = id }),
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
