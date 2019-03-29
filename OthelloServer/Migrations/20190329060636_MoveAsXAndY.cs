using Microsoft.EntityFrameworkCore.Migrations;

namespace OthelloServer.Migrations
{
    public partial class MoveAsXAndY : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Square",
                table: "Move");

            migrationBuilder.AddColumn<int>(
                name: "X",
                table: "Move",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Y",
                table: "Move",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "X",
                table: "Move");

            migrationBuilder.DropColumn(
                name: "Y",
                table: "Move");

            migrationBuilder.AddColumn<string>(
                name: "Square",
                table: "Move",
                nullable: false,
                defaultValue: "");
        }
    }
}
