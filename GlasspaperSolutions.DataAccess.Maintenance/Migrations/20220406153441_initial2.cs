using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GlasspaperSolutions.DataAccess.Maintenance.Migrations
{
    public partial class initial2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Resources_Bookings_BookingId",
                table: "Resources");

            migrationBuilder.AlterColumn<int>(
                name: "BookingId",
                table: "Resources",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Resources_Bookings_BookingId",
                table: "Resources",
                column: "BookingId",
                principalTable: "Bookings",
                principalColumn: "BookingId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Resources_Bookings_BookingId",
                table: "Resources");

            migrationBuilder.AlterColumn<int>(
                name: "BookingId",
                table: "Resources",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Resources_Bookings_BookingId",
                table: "Resources",
                column: "BookingId",
                principalTable: "Bookings",
                principalColumn: "BookingId");
        }
    }
}
