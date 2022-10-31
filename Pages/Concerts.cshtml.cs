using ConcerWebAPP.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

namespace ConcerWebAPP.Pages
{
    public class ConcertsModel : PageModel
    {
        private readonly ConcertApiContext _context;
        public List<SelectListItem> ArtistsOptions { get; set; }

        public ConcertsModel(ConcertApiContext context)
        {
            _context = context;
        }

        public void OnGet()
        {
            ArtistsOptions = _context.Artists.Select(a =>
                            new SelectListItem
                            {
                                Value = a.artist_id.ToString(),
                                Text = a.name_artist
                            }).ToList();
            
        }
    }
}
