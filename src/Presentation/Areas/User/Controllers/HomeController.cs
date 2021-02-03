using Applciation.Common.ViewModel;
using Microsoft.AspNetCore.Mvc;
using NToastNotify;
using System.Diagnostics;

namespace Presentation.Areas.User.Controllers
{
    [Area("User")]
    public class HomeController : BaseController
    {

        private readonly IToastNotification _toastNotification;

        public HomeController(IToastNotification toastNotification)
        {
            _toastNotification = toastNotification;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        public IActionResult GameWasFull()
        {
            _toastNotification.AddErrorToastMessage("Game was full");
            return RedirectToAction(nameof(Index));
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
