using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace OthelloServer.Migrations
{
    public partial class AddGameEntity2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Games",
                columns: table => new
                {
                    BlackPlayer = table.Column<string>(nullable: false),
                    WhitePlayer = table.Column<string>(nullable: false),
                    Id = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Games", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Move",
                columns: table => new
                {
                    GameId = table.Column<Guid>(nullable: false),
                    MoveNumber = table.Column<int>(nullable: false),
                    Square = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Move", x => new { x.GameId, x.MoveNumber });
                    table.ForeignKey(
                        name: "FK_Move_Games_GameId",
                        column: x => x.GameId,
                        principalTable: "Games",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Move");

            migrationBuilder.DropTable(
                name: "Games");
        }
    }
}
