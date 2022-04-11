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
    public class BookingsController : ControllerBase
    {
        private readonly IMemoryCache memoryCache;
        private readonly BookingContext _context;
        private static readonly SemaphoreSlim semaphore = new SemaphoreSlim(1, 1);

        public BookingsController(IMemoryCache memoryCache, BookingContext context)
        {
            this.memoryCache = memoryCache;
            _context = context;
        }

        // GET: api/Bookings
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var cacheKey = "bookingList";

            if (!memoryCache.TryGetValue(cacheKey, out List<Booking> bookingList))
            {

                try
                {
                    await semaphore.WaitAsync();

                    bookingList = await _context.Bookings
                        .Include(r => r.Resources)
                         .ThenInclude(a => a.Resource)
                        .ToListAsync();;
                    var cacheExpiryOptions = new MemoryCacheEntryOptions 
                    {
                        AbsoluteExpiration = DateTime.Now.AddMinutes(5),
                        Priority = CacheItemPriority.High,
                        SlidingExpiration = TimeSpan.FromMinutes(2)
                    };

                    memoryCache.Set(cacheKey, bookingList, cacheExpiryOptions);

                }
                finally
                {
                    semaphore.Release();
                }
            }
            return Ok(bookingList);
        }

        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<Booking>>> GetBookings()
        //{
        //    return await _context.Bookings
        //        .Include(r => r.Resources).ThenInclude(a => a.Resource)
        //        .ToListAsync();
        //}

        // GET: api/Bookings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Booking>> GetBooking(int id)
        {
            var booking = await _context.Bookings.Include("Resources").SingleOrDefaultAsync(i => i.BookingId == id);

            if (booking == null)
            {
                return NotFound();
            }

            return booking;
        }

        // PUT: api/Bookings/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBooking(int id, Booking booking)
        {
            if (id != booking.BookingId)
            {
                return BadRequest();
            }

            _context.Entry(booking).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                memoryCache.Remove("bookingList");

            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookingExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(booking);
        }

        // POST: api/Bookings
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Booking>> PostBooking(Booking booking)
        {
            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();
            memoryCache.Remove("bookingList");


            return CreatedAtAction("GetBooking", new { id = booking.BookingId }, booking);
        }

        // DELETE: api/Bookings/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBooking(int id)
        {
            var booking = await _context.Bookings.SingleOrDefaultAsync(i => i.BookingId == id);
            if (booking == null)
            {
                return NotFound();
            }

            _context.Bookings.Remove(booking);
            await _context.SaveChangesAsync();
            memoryCache.Remove("bookingList");
            return Ok(booking);
        }

        private bool BookingExists(int id)
        {
            return _context.Bookings.Any(e => e.BookingId == id);
        }
    }
}
