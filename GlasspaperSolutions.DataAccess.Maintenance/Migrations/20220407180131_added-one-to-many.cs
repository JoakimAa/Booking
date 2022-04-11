using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GlasspaperSolutions.DataAccess.Maintenance.Migrations
{
    public partial class addedonetomany : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AvailableResource");

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

        protected override void Down(MigrationBuilder migrationBuilder)
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
                name: "AvailableResource",
                columns: table => new
                {
                    BookingId = table.Column<int>(type: "int", nullable: false),
                    ResourceId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AvailableResource", x => new { x.BookingId, x.ResourceId });
                    table.ForeignKey(
                        name: "FK_AvailableResource_Resources_ResourceId",
                        column: x => x.ResourceId,
                        principalTable: "Resources",
                        principalColumn: "ResourceId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AvailableResources_Booking",
                        column: x => x.BookingId,
                        principalTable: "Bookings",
                        principalColumn: "BookingId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_AvailableResource_ResourceId",
                table: "AvailableResource",
                column: "ResourceId");
        }
    }
}
