using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GlasspaperSolutions.Model
{
    public class Resource {
        [Key]
        public int ResourceId { get; set; }
        [Required]
        public string? Name { get; set; }
        [Required]
        public string? Category { get; set; }
        [Required]
        public ICollection<BookingResource>? Bookings { get; set; }
    }
}

