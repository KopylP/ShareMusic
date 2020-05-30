using Microsoft.EntityFrameworkCore.Migrations;

namespace ShareMusic.Data.Migrations
{
    public partial class RoomOwnertoken : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "OwnerGuid",
                table: "Rooms",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OwnerGuid",
                table: "Rooms");
        }
    }
}
