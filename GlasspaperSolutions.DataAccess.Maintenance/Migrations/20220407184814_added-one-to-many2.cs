using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GlasspaperSolutions.DataAccess.Maintenance.Migrations
{
    public partial class addedonetomany2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Resources_Bookings_BookingId",
                table: "Resources");

            migrationBuilder.DropIndex(
                name: "IX_Resources_BookingId",
                table: "Resources");

            migrationBuilder.DropColumn(
                name: "BookingId",
                table: "Resources");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BookingId",
                table: "Resources",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Resources_BookingId",
                table: "Resources",
                column: "BookingId");

            migrationBuilder.AddForeignKey(
                name: "FK_Resources_Bookings_BookingId",
                table: "Resources",
                column: "BookingId",
                principalTable: "Bookings",
                principalColumn: "BookingId");
        }
    }
}
