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
    public class BooklistsController : ControllerBase
    {
        private readonly booklistDBContext _context;

        public BooklistsController(booklistDBContext context)
        {
            _context = context;
        }

        // GET: api/Booklists
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Booklist>>> GetBooklist()
        {
            return await _context.Booklist.ToListAsync();
        }

        // GET: api/Booklists/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Booklist>> GetBooklist(int id)
        {
            var booklist = await _context.Booklist.FindAsync(id);

            if (booklist == null)
            {
                return NotFound();
            }

            return booklist;
        }

        // PUT: api/Booklists/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBooklist(int id, Booklist booklist)
        {
            if (id != booklist.BooklistId)
            {
                return BadRequest();
            }

            _context.Entry(booklist).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BooklistExists(id))
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

        // POST: api/Booklists
        [HttpPost]
        public async Task<ActionResult<Booklist>> PostBooklist(Booklist booklist)
        {
            _context.Booklist.Add(booklist);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBooklist", new { id = booklist.BooklistId }, booklist);
        }

        // DELETE: api/Booklists/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Booklist>> DeleteBooklist(int id)
        {
            var booklist = await _context.Booklist.FindAsync(id);
            if (booklist == null)
            {
                return NotFound();
            }

            _context.Booklist.Remove(booklist);
            await _context.SaveChangesAsync();

            return booklist;
        }

        private bool BooklistExists(int id)
        {
            return _context.Booklist.Any(e => e.BooklistId == id);
        }
    }
}
