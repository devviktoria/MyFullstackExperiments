using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace jcdatabase.Migrations
{
    /// <inheritdoc />
    public partial class TagSeed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var insertSql = @"
INSERT INTO Tags (Name) VALUES ('programming');
INSERT INTO Tags (Name) VALUES ('animals');
INSERT INTO Tags (Name) VALUES ('cat');
INSERT INTO Tags (Name) VALUES ('dog');
INSERT INTO Tags (Name) VALUES ('sci-fi');
INSERT INTO Tags (Name) VALUES ('money');
INSERT INTO Tags (Name) VALUES ('food');
";
            migrationBuilder.Sql(insertSql);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
