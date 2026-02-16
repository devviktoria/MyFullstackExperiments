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
DECLARE @oldEmotion as varchar(10);

SELECT TOP 1 @oldEmotion = Emotion FROM dbo.JokeUserResponses
WHERE JokeId = @jokeId AND UserId = @userId
ORDER BY CreatedAt DESC;

IF (@emotion = @oldEmotion)
BEGIN
	THROW 51001, 'The user has this emotion on the joke already.', 1;
END


DECLARE @currentTime AS datetime = SYSDATETIME();
DECLARE @currentDate AS date = convert(date, @currentTime);

SET XACT_ABORT ON;

BEGIN TRY
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
	
	UPDATE dbo.ResponseStatistics
	SET Counter = Counter + 1
	WHERE JokeId = @jokeId AND ResponseDay = @currentDate;
	
	IF @@ROWCOUNT = 0
	BEGIN
	    INSERT INTO dbo.ResponseStatistics(JokeId, ResponseDay, Counter)
	    VALUES(@jokeId, @currentDate, 1);
	END
	
	COMMIT;
END TRY
BEGIN CATCH
    IF @@TRANCOUNT > 0
        ROLLBACK;

    THROW;
END CATCH";
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
