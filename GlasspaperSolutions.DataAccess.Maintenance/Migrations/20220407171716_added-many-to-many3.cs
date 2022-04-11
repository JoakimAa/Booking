using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GlasspaperSolutions.DataAccess.Maintenance.Migrations
{
    public partial class addedmanytomany3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AvailableResource",
                columns: table => new
                {
                    ResourceId = table.Column<int>(type: "int", nullable: false),
                    BookingId = table.Column<int>(type: "int", nullable: false)
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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AvailableResource");
        }
    }
}
