using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using WebApplication1.Pages;

namespace ConcerWebAPP.Pages
{
    public class ArtistsModel : PageModel
    {
        private readonly ILogger<IndexModel> _logger;

        public ArtistsModel(ILogger<IndexModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
        }
    }
}
