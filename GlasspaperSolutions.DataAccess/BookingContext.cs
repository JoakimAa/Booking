using GlasspaperSolutions.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace GlasspaperSolutions.DataAccess
{
    public class BookingContext : DbContext
    {

        public DbSet<Resource>? Resources { get; set; }
        public DbSet<Booking>? Bookings  { get; set; }
        public DbSet<BookingResource>? BookingResource  { get; set; }

        public BookingContext(DbContextOptions<BookingContext> options) : base(options) { }


        class DataContextFactory : IDesignTimeDbContextFactory<BookingContext>
        {
            public BookingContext CreateDbContext(string[] args)
            {
                var connection = @"Server=(localdb)\MSSQLLocalDB;Database=GlasspaperBooking;Trusted_Connection=True;ConnectRetryCount=0";

                var optionsBuilder = new DbContextOptionsBuilder<BookingContext>();
                optionsBuilder.UseSqlServer(connection, x => x.MigrationsAssembly("GlasspaperSolutions.DataAccess.Maintenance"));

                return new BookingContext(optionsBuilder.Options);
            }
        }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            if (builder is null)
            {
                throw new ArgumentNullException(nameof(builder));
            }

            builder.Entity<BookingResource>(entity =>
            {
                entity.HasKey(e => new { e.BookingId, e.ResourceId });

                entity.HasOne(d => d.Booking)
                    .WithMany(p => p.Resources)
                    .HasForeignKey(d => d.BookingId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BookingResource_Booking");

                entity.HasOne(d => d.Resource)
                    .WithMany(p => p.Bookings)
                    .HasForeignKey(d => d.ResourceId)
                    .HasConstraintName("FK_BookingResource_Resource");
            });

            //builder.Entity<AvailableResource>(entity =>
            //{
            //    entity.HasKey(e => new { e.BookingId, e.ResourceId });

            //    entity.HasOne(b => b.Booking)
            //        .WithMany(p => p.AvailableResources)
            //        .OnDelete(DeleteBehavior.ClientSetNull)
            //        .HasConstraintName("FK_AvailableResources_Booking");

            //    entity.HasOne(b => b.Resource)
            //        .WithOne(p => p.Booking)
            //        .OnDelete(DeleteBehavior.ClientSetNull)
            //        .HasConstraintName("FK_AvailableResources_Booking");

            //});
        }
    }
}