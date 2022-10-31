#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using ConcerWebAPP.Models;

namespace ConcerWebAPP.Controllers
{
    public class ConcertsController : Controller
    {
        private readonly ConcertApiContext _context;

        public ConcertsController(ConcertApiContext context)
        {
            _context = context;
        }

        // GET: Concerts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Concert>>> GetConcerts()
        {
            return await _context.Concerts.ToListAsync();
        }

        // GET: api/Concerts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Concert>> GetConcert(int id)
        {
            var concert = await _context.Concerts.FindAsync(id);

            if (concert == null)
            {
                return NotFound();
            }

            return concert;
        }

        // PUT: api/Concerts/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutConcert(int id, Concert concert)
        {
            if (id != concert.concert_id)
            {
                return BadRequest();
            }

            _context.Entry(concert).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ConcertExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: Concerts/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult<Concert>> PostConcert(Concert concert)
        {
            _context.Add(concert);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetConcert", new { id = concert.concert_id }, concert);
        }

        // DELETE: api/Concerts/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Concert>> deleteConcert(int id)
        {
            var concert = await _context.Concerts.FindAsync(id);
            if (concert == null)
            {
                return NotFound();
            }

            _context.Concerts.Remove(concert);
            await _context.SaveChangesAsync();

            return concert;
        }
        
        private bool ConcertExists(int id)
        {
            return _context.Concerts.Any(e => e.concert_id == id);
        }
    }
}
