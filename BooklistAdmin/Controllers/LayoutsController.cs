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
    public class LayoutsController : ControllerBase
    {
        private readonly booklistDBContext _context;

        public LayoutsController(booklistDBContext context)
        {
            _context = context;
        }

        // GET: api/Layouts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Layout>>> GetLayout()
        {
            return await _context.Layout.ToListAsync();
        }

        // GET: api/Layouts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Layout>> GetLayout(int id)
        {
            var layout = await _context.Layout.FindAsync(id);

            if (layout == null)
            {
                return NotFound();
            }

            return layout;
        }

        // PUT: api/Layouts/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLayout(int id, Layout layout)
        {
            if (id != layout.LayoutId)
            {
                return BadRequest();
            }

            _context.Entry(layout).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LayoutExists(id))
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

        // POST: api/Layouts
        [HttpPost]
        public async Task<ActionResult<Layout>> PostLayout(Layout layout)
        {
            _context.Layout.Add(layout);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLayout", new { id = layout.LayoutId }, layout);
        }

        // DELETE: api/Layouts/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Layout>> DeleteLayout(int id)
        {
            var layout = await _context.Layout.FindAsync(id);
            if (layout == null)
            {
                return NotFound();
            }

            _context.Layout.Remove(layout);
            await _context.SaveChangesAsync();

            return layout;
        }

        private bool LayoutExists(int id)
        {
            return _context.Layout.Any(e => e.LayoutId == id);
        }
    }
}
