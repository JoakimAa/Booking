using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GlasspaperSolutions.DataAccess.Maintenance.Migrations
{
    public partial class addedmanytomany2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BookingResource_Bookings_BookingsBookingId",
                table: "BookingResource");

            migrationBuilder.DropForeignKey(
                name: "FK_BookingResource_Resources_ResourcesResourceId",
                table: "BookingResource");

            migrationBuilder.RenameColumn(
                name: "ResourcesResourceId",
                table: "BookingResource",
                newName: "ResourceId");

            migrationBuilder.RenameColumn(
                name: "BookingsBookingId",
                table: "BookingResource",
                newName: "BookingId");

            migrationBuilder.RenameIndex(
                name: "IX_BookingResource_ResourcesResourceId",
                table: "BookingResource",
                newName: "IX_BookingResource_ResourceId");

            migrationBuilder.AddForeignKey(
                name: "FK_BookingResource_Booking",
                table: "BookingResource",
                column: "BookingId",
                principalTable: "Bookings",
                principalColumn: "BookingId");

            migrationBuilder.AddForeignKey(
                name: "FK_BookingResource_Resource",
                table: "BookingResource",
                column: "ResourceId",
                principalTable: "Resources",
                principalColumn: "ResourceId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BookingResource_Booking",
                table: "BookingResource");

            migrationBuilder.DropForeignKey(
                name: "FK_BookingResource_Resource",
                table: "BookingResource");

            migrationBuilder.RenameColumn(
                name: "ResourceId",
                table: "BookingResource",
                newName: "ResourcesResourceId");

            migrationBuilder.RenameColumn(
                name: "BookingId",
                table: "BookingResource",
                newName: "BookingsBookingId");

            migrationBuilder.RenameIndex(
                name: "IX_BookingResource_ResourceId",
                table: "BookingResource",
                newName: "IX_BookingResource_ResourcesResourceId");

            migrationBuilder.AddForeignKey(
                name: "FK_BookingResource_Bookings_BookingsBookingId",
                table: "BookingResource",
                column: "BookingsBookingId",
                principalTable: "Bookings",
                principalColumn: "BookingId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_BookingResource_Resources_ResourcesResourceId",
                table: "BookingResource",
                column: "ResourcesResourceId",
                principalTable: "Resources",
                principalColumn: "ResourceId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
