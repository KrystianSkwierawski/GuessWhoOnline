using Applciation.ViewModel;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace Presentation.Areas.User.Controllers
{
    [Area("User")]
    public class GameController : BaseController
    {
        [Route("game/{id}", Name = "Game")]
        public IActionResult Index(string id)
        {
            return View("Index", id);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
