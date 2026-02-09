using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace jcdatabase.Migrations
{
    /// <inheritdoc />
    public partial class RefineResponseStatistics : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Day",
                table: "ResponseStatistics",
                newName: "ResponseDay");

            migrationBuilder.CreateTable(
                name: "JokeUserResponses",
                columns: table => new
                {
                    JokeId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Emotion = table.Column<string>(type: "varchar(10)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JokeUserResponses", x => new { x.JokeId, x.UserId, x.CreatedAt });
                    table.CheckConstraint("CK_EmotionValue1", "[Emotion] IN ('sleepy','none','happy','lol','lshic')");
                    table.ForeignKey(
                        name: "FK_JokeUserResponses_Jokes_JokeId",
                        column: x => x.JokeId,
                        principalTable: "Jokes",
                        principalColumn: "JokeId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_JokeUserResponses_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_JokeUserResponses_JokeId_CreatedAt",
                table: "JokeUserResponses",
                columns: new[] { "JokeId", "CreatedAt" });

            migrationBuilder.CreateIndex(
                name: "IX_JokeUserResponses_UserId",
                table: "JokeUserResponses",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "JokeUserResponses");

            migrationBuilder.RenameColumn(
                name: "ResponseDay",
                table: "ResponseStatistics",
                newName: "Day");
        }
    }
}
