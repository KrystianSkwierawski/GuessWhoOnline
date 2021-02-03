using Applciation.Common.ViewModel;
using Application.Common.Interfaces;
using Application.Common.Models;
using Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Threading.Tasks;

namespace Presentation.Areas.User.Controllers
{
    [Area("User")]
    public class GameController : BaseController
    {
        IMatchListItemsService _matchListItemsService;
        ICharactersService _charactersService;

        public GameController(IMatchListItemsService matchListItemsService, ICharactersService charactersService)
        {
            _matchListItemsService = matchListItemsService;
            _charactersService = charactersService;
        }

        [Route("game/{id}", Name = "Game")]
        public async Task<IActionResult> Index(string id)
        {
            GameViewModel gameViewModel = new GameViewModel
            {
                Id = id,
                CharactersNames = _charactersService.GetCharacterNames(),
                NumberOfConnections = _matchListItemsService.GetNumberOfConnections(id)
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
