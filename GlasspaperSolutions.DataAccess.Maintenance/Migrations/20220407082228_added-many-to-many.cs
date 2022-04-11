using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GlasspaperSolutions.DataAccess.Maintenance.Migrations
{
    public partial class addedmanytomany : Migration
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

            migrationBuilder.CreateTable(
                name: "BookingResource",
                columns: table => new
                {
                    BookingsBookingId = table.Column<int>(type: "int", nullable: false),
                    ResourcesResourceId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BookingResource", x => new { x.BookingsBookingId, x.ResourcesResourceId });
                    table.ForeignKey(
                        name: "FK_BookingResource_Bookings_BookingsBookingId",
                        column: x => x.BookingsBookingId,
                        principalTable: "Bookings",
                        principalColumn: "BookingId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BookingResource_Resources_ResourcesResourceId",
                        column: x => x.ResourcesResourceId,
                        principalTable: "Resources",
                        principalColumn: "ResourceId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BookingResource_ResourcesResourceId",
                table: "BookingResource",
                column: "ResourcesResourceId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BookingResource");

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
                principalColumn: "BookingId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
