using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GlasspaperSolutions.Model
{
    public class BookingResource {
        public int ResourceId { get; set; }
        public Resource? Resource { get; set; }
        public int BookingId { get; set; }
        public Booking? Booking { get; set; }
    }
}
