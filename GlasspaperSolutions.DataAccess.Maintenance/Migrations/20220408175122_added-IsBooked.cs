using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GlasspaperSolutions.DataAccess.Maintenance.Migrations
{
    public partial class addedIsBooked : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsBooked",
                table: "Bookings",
                type: "bit",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsBooked",
                table: "Bookings");
        }
    }
}
