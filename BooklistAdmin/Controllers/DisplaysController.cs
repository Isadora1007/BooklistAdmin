using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BooklistAdmin.Models;

namespace BooklistAdmin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DisplaysController : ControllerBase
    {
        private readonly booklistDBContext _context;

        public DisplaysController(booklistDBContext context)
        {
            _context = context;
        }

        // GET: api/Displays
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Display>>> GetDisplay()
        {
            return await _context.Display.ToListAsync();
        }

        // GET: api/Displays/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Display>> GetDisplay(int id)
        {
            var display = await _context.Display.FindAsync(id);

            if (display == null)
            {
                return NotFound();
            }

            return display;
        }

        // PUT: api/Displays/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDisplay(int id, Display display)
        {
            if (id != display.DisplayId)
            {
                return BadRequest();
            }

            _context.Entry(display).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DisplayExists(id))
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

        // POST: api/Displays
        [HttpPost]
        public async Task<ActionResult<Display>> PostDisplay(Display display)
        {
            _context.Display.Add(display);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDisplay", new { id = display.DisplayId }, display);
        }

        // DELETE: api/Displays/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Display>> DeleteDisplay(int id)
        {
            var display = await _context.Display.FindAsync(id);
            if (display == null)
            {
                return NotFound();
            }

            _context.Display.Remove(display);
            await _context.SaveChangesAsync();

            return display;
        }

        private bool DisplayExists(int id)
        {
            return _context.Display.Any(e => e.DisplayId == id);
        }
    }
}
