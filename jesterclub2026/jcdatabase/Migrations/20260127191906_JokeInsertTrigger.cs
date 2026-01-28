using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace jcdatabase.Migrations
{
    /// <inheritdoc />
    public partial class JokeInsertTrigger : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var sql = @"CREATE TRIGGER dbo.CreateEmotionCountersForJoke
ON dbo.Jokes
AFTER INSERT
AS
    IF (ROWCOUNT_BIG() = 0)
    RETURN;

    DECLARE @newJokeId INT;
    SET @newJokeId = @@IDENTITY;
    
    INSERT INTO EmotionCounters(JokeId, Emotion, Counter) VALUES (@newJokeId, 'lshic', 0);
    INSERT INTO EmotionCounters(JokeId, Emotion, Counter) VALUES (@newJokeId, 'lol', 0);
    INSERT INTO EmotionCounters(JokeId, Emotion, Counter) VALUES (@newJokeId, 'happy', 0);
    INSERT INTO EmotionCounters(JokeId, Emotion, Counter) VALUES (@newJokeId, 'none', 0);
    INSERT INTO EmotionCounters(JokeId, Emotion, Counter) VALUES (@newJokeId, 'sleepy', 0);
";
            migrationBuilder.Sql(sql);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            var sql = "DROP TRIGGER dbo.CreateEmotionCountersForJoke";
            migrationBuilder.Sql(sql);
        }
    }
}
