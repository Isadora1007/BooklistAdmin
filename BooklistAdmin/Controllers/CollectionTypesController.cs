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
    public class CollectionTypesController : ControllerBase
    {
        private readonly booklistDBContext _context;

        public CollectionTypesController(booklistDBContext context)
        {
            _context = context;
        }

        // GET: api/CollectionTypes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CollectionType>>> GetCollectionType()
        {
            return await _context.CollectionType.ToListAsync();
        }

        // GET: api/CollectionTypes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CollectionType>> GetCollectionType(int id)
        {
            var collectionType = await _context.CollectionType.FindAsync(id);

            if (collectionType == null)
            {
                return NotFound();
            }

            return collectionType;
        }

        // PUT: api/CollectionTypes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCollectionType(int id, CollectionType collectionType)
        {
            if (id != collectionType.CollectionTypeId)
            {
                return BadRequest();
            }

            _context.Entry(collectionType).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CollectionTypeExists(id))
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

        // POST: api/CollectionTypes
        [HttpPost]
        public async Task<ActionResult<CollectionType>> PostCollectionType(CollectionType collectionType)
        {
            _context.CollectionType.Add(collectionType);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCollectionType", new { id = collectionType.CollectionTypeId }, collectionType);
        }

        // DELETE: api/CollectionTypes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<CollectionType>> DeleteCollectionType(int id)
        {
            var collectionType = await _context.CollectionType.FindAsync(id);
            if (collectionType == null)
            {
                return NotFound();
            }

            _context.CollectionType.Remove(collectionType);
            await _context.SaveChangesAsync();

            return collectionType;
        }

        private bool CollectionTypeExists(int id)
        {
            return _context.CollectionType.Any(e => e.CollectionTypeId == id);
        }
    }
}
