using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace jcdatabase.Migrations
{
    /// <inheritdoc />
    public partial class JokeSeed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var sql = @"SET IDENTITY_INSERT Jokes ON;
INSERT INTO Jokes (JokeId, JokeText, Source, CreatedDate, ReleasedDate, ResponseSum, UserId) VALUES (1,'My code works perfectly…\nI just don''t know why yet.', 'ChatGPT', '2026-01-01 11:12:00', '2026-01-01 11:12:00', 0, 1);
INSERT INTO Jokes (JokeId, JokeText, Source, CreatedDate, ReleasedDate, ResponseSum, UserId) VALUES (2,'Why do programmers prefer dark mode?\nBecause light attracts bugs.', 'ChatGPT', '2026-01-02 10:12:00', '2026-01-02 10:12:00', 0, 1);
INSERT INTO Jokes (JokeId, JokeText, Source, CreatedDate, ReleasedDate, ResponseSum, UserId) VALUES (3,'Why was the developer always calm?\nBecause they knew how to handle every case.', 'ChatGPT', '2026-01-03 13:12:00', '2026-01-03 13:12:00', 0, 1);
INSERT INTO Jokes (JokeId, JokeText, Source, CreatedDate, ReleasedDate, ResponseSum, UserId) VALUES (4,'Why don''t dogs make good dancers?\nThey have two left paws.', 'ChatGPT', '2026-01-04 13:12:00', NULL, 0, 1);
INSERT INTO Jokes (JokeId, JokeText, Source, CreatedDate, ReleasedDate, ResponseSum, UserId) VALUES (5,'Why do programmers hate nature?\nToo many bugs and no debugger.', 'ChatGPT', '2026-01-05 14:12:00', '2026-01-05 14:12:00', 0, 1);
INSERT INTO Jokes (JokeId, JokeText, Source, CreatedDate, ReleasedDate, ResponseSum, UserId) VALUES (6,'Why don''t cats use social media?\nThey already get enough attention.', 'ChatGPT', '2026-01-06 15:12:00', '2026-01-06 15:12:00', 0, 1);
INSERT INTO Jokes (JokeId, JokeText, Source, CreatedDate, ReleasedDate, ResponseSum, UserId) VALUES (7,'What do you call a dog who can do magic?\nA labracadabrador.', 'ChatGPT', '2026-01-04 12:05:00', '2026-01-04 12:05:00', 0, 2);
INSERT INTO Jokes (JokeId, JokeText, Source, CreatedDate, ReleasedDate, ResponseSum, UserId) VALUES (8,'What do you call a lazy kangaroo?\nA pouch potato.', 'ChatGPT', '2026-01-05 10:05:00', '2026-01-05 10:05:00', 0, 2);
INSERT INTO Jokes (JokeId, JokeText, Source, CreatedDate, ReleasedDate, ResponseSum, UserId) VALUES (9,'A programmer''s favorite place to hang out?\nThe Foo Bar.', 'ChatGPT', '2026-01-06 09:05:00', '2026-01-06 09:05:00', 0, 2);
INSERT INTO Jokes (JokeId, JokeText, Source, CreatedDate, ReleasedDate, ResponseSum, UserId) VALUES (10,'Why did the cow become an astronaut?\nIt wanted to see the moooon.', 'ChatGPT', '2026-01-07 18:05:00', NULL, 0, 2);
INSERT INTO JokeTag(JokesJokeId, TagsTagId) VALUES (1, 1);
INSERT INTO JokeTag(JokesJokeId, TagsTagId) VALUES (2, 1);
INSERT INTO JokeTag(JokesJokeId, TagsTagId) VALUES (3, 1);
INSERT INTO JokeTag(JokesJokeId, TagsTagId) VALUES (4, 2);
INSERT INTO JokeTag(JokesJokeId, TagsTagId) VALUES (4, 4);
INSERT INTO JokeTag(JokesJokeId, TagsTagId) VALUES (5, 1);
INSERT INTO JokeTag(JokesJokeId, TagsTagId) VALUES (6, 2);
INSERT INTO JokeTag(JokesJokeId, TagsTagId) VALUES (6, 3);
INSERT INTO JokeTag(JokesJokeId, TagsTagId) VALUES (7, 2);
INSERT INTO JokeTag(JokesJokeId, TagsTagId) VALUES (7, 4);
INSERT INTO JokeTag(JokesJokeId, TagsTagId) VALUES (8, 2);
SET IDENTITY_INSERT Jokes OFF;
";
            migrationBuilder.Sql(sql);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            var sql = @"DELETE FROM EmotionCounters;
DELETE FROM JokeTag;
DELETE FROM Jokes;
";
            migrationBuilder.Sql(sql);
        }
    }
}
