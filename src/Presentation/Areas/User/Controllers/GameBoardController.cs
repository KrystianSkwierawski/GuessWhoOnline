using Applciation.ViewModel;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace Presentation.Areas.User.Controllers
{
    [Area("User")]
    public class GameBoardController : BaseController
    {
        public IActionResult Index()
        {
            return View();
        }

        [Route("game/{id}", Name = "Game")]
        public IActionResult Game()
        {

            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
