using GlasspaperSolutions.DataAccess;
using GlasspaperSolutions.Model;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

class Program
{
    static void Main(string[] args)
    {
        var connection = @"Server=(localdb)\MSSQLLocalDB;Database=GlasspaperBooking;Trusted_Connection=True;ConnectRetryCount=0";

        var optionsBuilder = new DbContextOptionsBuilder<BookingContext>();
        optionsBuilder.UseSqlServer(connection, x => x.MigrationsAssembly("GlasspaperSolutions.DataAccess.Maintenance"));

        PopulateDatabase(optionsBuilder);
        //QueryData(optionsBuilder);
    }

    private static void QueryData(DbContextOptionsBuilder<BookingContext> optionsBuilder)
    {
        using var db = new BookingContext(optionsBuilder.Options);
     
    }


    private static void PopulateDatabase(DbContextOptionsBuilder<BookingContext> optionsBuilder)
    {
        try
        {
            using var data = new BookingContext(optionsBuilder.Options);

            // Create receipts

            var verktoy = new Booking() {Name = "Leie av verktøy", Type = "Verktøy", StartTime = DateTime.Now, EndTime = DateTime.Now, Owner = "Ola Normann", Lender = "Karl Karlsen" };
            var verktoy2 = new Booking() { Name = "Leie av verktøy 2", Type = "Verktøy", Owner = "Nils Normann"};
            var verktoy3 = new Booking() { Name = "Leie av verktøy 3", Type = "Verktøy", Owner = "Morten Trulsen"};

            var bil = new Booking() { Name = "Leie av bil", Type = "Bil", StartTime = DateTime.Now, EndTime = DateTime.Now, Owner = "Nils Normann", Lender = "Morten Trulsen" };
            Console.WriteLine("Added resource and booking to ResourceInBooking");
            
            var hammer = new Resource() { Name = "Hammer", Category = "Verktøy"};
            var tang = new Resource() { Name = "Tang", Category = "Verktøy"};
            var loddebolt = new Resource() { Name = "Loddebolt", Category = "Verktøy"};
            var spiker = new Resource() { Name = "Spiker", Category = "Verktøy",};
            Console.WriteLine("Resource: {0} has been made", hammer);

            //var verktoyHammer = new BookingResource() { Booking = verktoy, Resource = hammer};
            //var verktoytang = new BookingResource() { Booking = verktoy, Resource = tang};
            //var verktoyloddebolt = new BookingResource() { Booking = verktoy, Resource = loddebolt};
            //var bilHammer = new BookingResource() { Booking = bil, Resource = hammer};

            //var verktoyHammer2 = new BookingResource() { Booking = verktoy2, Resource = hammer };
            //var verktoytang2 = new BookingResource() { Booking = verktoy2, Resource = tang };
            //var verktoyloddebolt2 = new BookingResource() { Booking = verktoy2, Resource = loddebolt };

            data?.Resources?.Add(hammer);
            data?.Resources?.Add(tang);
            data?.Resources?.Add(loddebolt);
            data?.Resources?.Add(spiker);

            data?.Bookings?.Add(verktoy);
            data?.Bookings?.Add(bil);
            data?.Bookings?.Add(verktoy2);
            data?.Bookings?.Add(verktoy3);

            data?.BookingResource?.Add(new BookingResource() { Booking = verktoy, Resource = hammer });
            data?.BookingResource?.Add(new BookingResource() { Booking = verktoy, Resource = loddebolt });
            data?.BookingResource?.Add(new BookingResource() { Booking = verktoy, Resource = tang });
            data?.BookingResource?.Add(new BookingResource() { Booking = verktoy, Resource = spiker });

            data?.BookingResource?.Add(new BookingResource() { Booking = verktoy2, Resource = hammer });

            //data?.BookingResources?.Add(verktoyHammer);
            //data?.BookingResources?.Add(verktoytang);
            //data?.BookingResources?.Add(verktoyloddebolt);

            //data?.BookingResources?.Add(verktoyHammer2);
            //data?.BookingResources?.Add(verktoytang2);
            //data?.BookingResources?.Add(verktoyloddebolt2);
          
            //data?.BookingResources?.Add(bilHammer);

            Console.WriteLine("Added {0} to data", verktoy);
            data?.SaveChanges();
            Console.WriteLine("Data has been saved to db");

        }
        catch (SqlException sqlex)
        {
            Console.WriteLine(sqlex.Message);
        }
    }
}