using System.ComponentModel.DataAnnotations;

namespace GlasspaperSolutions.Model
{
    public class Booking
    {
        [Key]
        public int BookingId { get; set; }
        [Required]
        public string? Name { get; set; }
        [Required]
        public string? Type { get; set; }       
        [Required]
        public string? Owner { get; set; }     
        public string? Lender { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        //public ICollection<Resource>? AvailableResources { get; set; }
        public ICollection<BookingResource>? Resources { get; set; }
    }
}