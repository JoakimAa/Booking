#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GlasspaperSolutions.DataAccess;
using GlasspaperSolutions.Model;
using Microsoft.Extensions.Caching.Memory;

namespace GlasspaperSolutions.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResourcesController : ControllerBase
    {
        private readonly BookingContext _context;
        private readonly IMemoryCache memoryCache;
        private static readonly SemaphoreSlim semaphore = new SemaphoreSlim(1, 1);



        public ResourcesController(IMemoryCache memoryCache, BookingContext context)
        {
            this.memoryCache = memoryCache;
            _context = context;
        }

        // GET: api/Resources


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Resource>>> GetResources()
        {
            var cacheKey = "resorceList";

            if (!memoryCache.TryGetValue(cacheKey, out List<Resource> resorceList))
            {

                try
                {
                    await semaphore.WaitAsync();

                    resorceList = await _context.Resources.ToListAsync();
                    var cacheExpiryOptions = new MemoryCacheEntryOptions
                    {
                        AbsoluteExpiration = DateTime.Now.AddMinutes(5),
                        Priority = CacheItemPriority.High,
                        SlidingExpiration = TimeSpan.FromMinutes(2)
                    };

                    memoryCache.Set(cacheKey, resorceList, cacheExpiryOptions);

                }
                finally
                {
                    semaphore.Release();
                }
            }
            return Ok(resorceList);
        }

        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<Resource>>> GetResources()
        //{
        //    return await _context.Resources.ToListAsync();
        //}

        // GET: api/Resources/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Resource>> GetResource(int id)
        {
            var resource = await _context.Resources.FindAsync(id);

            if (resource == null)
            {
                return NotFound();
            }

            return resource;
        }

        // PUT: api/Resources/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutResource(int id, Resource resource)
        {
            if (id != resource.ResourceId)
            {
                return BadRequest();
            }

            _context.Entry(resource).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                memoryCache.Remove("resorceList");
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ResourceExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(resource);
        }

        // POST: api/Resources
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Resource>> PostResource(Resource resource)
        {
            _context.Resources.Add(resource);
            await _context.SaveChangesAsync();
            memoryCache.Remove("resorceList");

            return CreatedAtAction("GetResource", new { id = resource.ResourceId }, resource);
        }

        // DELETE: api/Resources/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteResource(int id)
        {
            var resource = await _context.Resources.FindAsync(id);
            if (resource == null)
            {
                return NotFound();
            }

            _context.Resources.Remove(resource);
            await _context.SaveChangesAsync();
            memoryCache.Remove("resorceList");

            return Ok(resource);
        }

        private bool ResourceExists(int id)
        {
            return _context.Resources.Any(e => e.ResourceId == id);
        }
    }
}

