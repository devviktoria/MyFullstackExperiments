using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace jcdatabase.Migrations
{
    /// <inheritdoc />
    public partial class UserSeed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var insertSql = @"
INSERT INTO Users (UserName, UserEmail) VALUES ('Viki', 'viki@nodomain.com');
INSERT INTO Users (UserName, UserEmail) VALUES ('Charles', 'charles@nodomain.com');
";
            migrationBuilder.Sql(insertSql);

        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
