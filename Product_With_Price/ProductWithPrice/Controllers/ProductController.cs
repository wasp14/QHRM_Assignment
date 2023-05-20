using Microsoft.AspNetCore.Mvc;

namespace ProductWithPrice.Controllers
{
    public class ProductController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
