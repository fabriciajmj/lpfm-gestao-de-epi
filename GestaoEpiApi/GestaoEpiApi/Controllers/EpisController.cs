using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GestaoEpiApi.Data;
using GestaoEpiApi.Models;

namespace GestaoEpiApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EpisController : ControllerBase
    {
        private readonly ApiDbContext _context;

        public EpisController(ApiDbContext context)
        {
            _context = context;
        }

        // GET: api/Epis
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Epi>>> GetEpis()
        {
            return await _context.Epis.ToListAsync();
        }

        // GET: api/Epis/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Epi>> GetEpi(int id)
        {
            var epi = await _context.Epis.FindAsync(id);

            if (epi == null)
            {
                return NotFound();
            }

            return epi;
        }

        // PUT: api/Epis/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEpi(int id, Epi epi)
        {
            if (id != epi.Id)
            {
                return BadRequest();
            }

            _context.Entry(epi).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EpiExists(id))
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

        // POST: api/Epis
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Epi>> PostEpi(Epi epi)
        {
            _context.Epis.Add(epi);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEpi", new { id = epi.Id }, epi);
        }

        // DELETE: api/Epis/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEpi(int id)
        {
            var epi = await _context.Epis.FindAsync(id);
            if (epi == null)
            {
                return NotFound();
            }

            _context.Epis.Remove(epi);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EpiExists(int id)
        {
            return _context.Epis.Any(e => e.Id == id);
        }
    }
}