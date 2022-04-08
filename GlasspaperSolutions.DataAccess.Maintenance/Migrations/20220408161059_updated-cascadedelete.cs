using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GlasspaperSolutions.DataAccess.Maintenance.Migrations
{
    public partial class updatedcascadedelete : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BookingResource_Booking",
                table: "BookingResource");

            migrationBuilder.AddForeignKey(
                name: "FK_BookingResource_Booking",
                table: "BookingResource",
                column: "BookingId",
                principalTable: "Bookings",
                principalColumn: "BookingId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BookingResource_Booking",
                table: "BookingResource");

            migrationBuilder.AddForeignKey(
                name: "FK_BookingResource_Booking",
                table: "BookingResource",
                column: "BookingId",
                principalTable: "Bookings",
                principalColumn: "BookingId");
        }
    }
}
