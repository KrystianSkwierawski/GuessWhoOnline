using Applciation.ViewModel;
using Domain;
using Domain.List;
using Domain.ViewModels;
using Microsoft.AspNetCore.Mvc;
using NToastNotify;
using System.Diagnostics;
using System.Threading.Tasks;

namespace Presentation.Areas.User.Controllers
{
    [Area("User")]
    public class GameController : BaseController
    {
        private readonly IToastNotification _toastNotification;

        public GameController(IToastNotification toastNotification)
        {
            _toastNotification = toastNotification;
        }

        [Route("game/{id}", Name = "Game")]
        public async Task<IActionResult> Index(string id)
        {
            int numberOfConnections = await MatchListItems.GetNumberOfConnections(id);
            bool gameIsFull = (numberOfConnections == 2) ? true : false;
            if (gameIsFull)
            {
                _toastNotification.AddErrorToastMessage("Game was full");
                return RedirectToAction("Index", "Home");
            }

            await MatchListItems.AddConnection(id);

            GameViewModel gameViewModel = new GameViewModel
            {
                Id = id,
                CharactersNames = Characters.CharacterNames,
                NumberOfConnections = await MatchListItems.GetNumberOfConnections(id)
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
