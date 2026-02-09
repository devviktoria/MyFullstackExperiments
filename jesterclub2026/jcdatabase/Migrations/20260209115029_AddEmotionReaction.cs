using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace jcdatabase.Migrations
{
    /// <inheritdoc />
    public partial class AddEmotionReaction : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var spSql = @"CREATE PROCEDURE dbo.AddEmotionReaction(@jokeId int, @userId int, @emotion varchar(10))
AS

IF (NOT EXISTS (SELECT * FROM dbo.Jokes WHERE JokeId = @jokeId))
BEGIN 
    THROW 51000, 'The joke with the given id does not exist.', 1;  
END

IF (NOT EXISTS (SELECT * FROM dbo.Users WHERE UserId = @userId))
BEGIN 
    THROW 51000, 'The user with the given id does not exist.', 1;  
END

DECLARE @oldEmotion as varchar(10);

SELECT TOP 1 @oldEmotion = Emotion FROM dbo.JokeUserResponses
WHERE JokeId = @jokeId AND UserId = @userId
ORDER BY CreatedAt DESC;

IF (@emotion = @oldEmotion)
BEGIN
	THROW 51000, 'The user has this emotion on the joke already.', 1;
END

DECLARE @currentTime AS datetime = SYSDATETIME();
DECLARE @currentDate AS date = convert(date, @currentTime);

BEGIN TRANSACTION;

INSERT INTO dbo.JokeUserResponses(JokeId, UserId, CreatedAt, Emotion) VALUES (@jokeId, @userId, @currentTime, @emotion);

UPDATE dbo.EmotionCounters
SET Counter = Counter + 1
WHERE JokeId = @jokeId AND Emotion = @emotion;

IF (@oldEmotion IS NULL)
BEGIN
	UPDATE dbo.Jokes
	SET ResponseSum = ResponseSum + 1
	WHERE JokeId = @jokeId;
END
ELSE
BEGIN
	UPDATE dbo.EmotionCounters
	SET Counter = Counter - 1
	WHERE JokeId = @jokeId AND Emotion = @oldEmotion;
END

IF (NOT EXISTS (SELECT * FROM dbo.ResponseStatistics WHERE JokeId = @jokeId and ResponseDay = @currentDate))
BEGIN
	INSERT INTO dbo.ResponseStatistics VALUES(1, @currentDate, 1);
END
ELSE
BEGIN
	UPDATE dbo.ResponseStatistics
	SET Counter = Counter + 1
	WHERE JokeId = @jokeId AND ResponseDay = @currentDate;
END

COMMIT;";
            migrationBuilder.Sql(spSql);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            var spSql = "DROP PROCEDURE IF EXISTS dbo.AddEmotionReaction;";
            migrationBuilder.Sql(spSql);
        }
    }
}
