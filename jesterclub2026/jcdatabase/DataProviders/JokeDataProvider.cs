using System.Linq.Expressions;
using jcdatabase.DataAccess;
using jcdatabase.DataProviderInterfaces;
using jcdatabase.Models;
using jcdomain;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking.Internal;

namespace jcdatabase.DataProviders;

public class JokeDataProvider : IJokeDataProvider
{
    private readonly JesterClubDbContext _dbContext;
    private readonly ITagDataProvider _tagDataProvider;

    public JokeDataProvider(JesterClubDbContext dbContext, ITagDataProvider tagDataProvider)
    {
        _dbContext = dbContext;
        _tagDataProvider = tagDataProvider;
    }

    public async Task<Joke?> GetJokeById(int id, CancellationToken ct)
    {
        return await _dbContext.Jokes
            .Include(j => j.User)
            .Include(j => j.Tags)
            .Include(j => j.EmotionCounters)
            .AsNoTracking()
            .FirstOrDefaultAsync(j => j.JokeId == id, ct);
    }

    public async Task<Joke?> GetJokeUpsertData(int id, CancellationToken ct)
    {
        return await _dbContext.Jokes
            .Include(j => j.Tags)
            .AsNoTracking()
            .FirstOrDefaultAsync(j => j.JokeId == id, ct);
    }

    public async Task CreateJoke(Joke joke, IEnumerable<string> tagNames, CancellationToken cancellationToken)
    {
        var tags = await _tagDataProvider.MapTags(tagNames, cancellationToken);
        joke.Tags = tags;
        _dbContext.Jokes.Add(joke);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateJoke(Joke updatedJoke, IEnumerable<string> tagNames, CancellationToken cancellationToken)
    {
        var joke = await _dbContext.Jokes
            .Include(j => j.Tags)
            .FirstOrDefaultAsync(j => j.JokeId == updatedJoke.JokeId, cancellationToken);

        if (joke is null)
        {
            throw new KeyNotFoundException("The joke does not exists in the database.");
        }

        joke.JokeText = updatedJoke.JokeText;
        joke.Source = updatedJoke.Source;
        joke.ReleasedDate = updatedJoke.ReleasedDate;
        var tags = await _tagDataProvider.MapTags(tagNames, cancellationToken);
        joke.Tags = tags;
        await _dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task Remove(int id)
    {
        throw new NotImplementedException();
    }

    public async Task<Joke?> UpdateEmotionCounters(int jokeId, int userId, string emotion, CancellationToken cancellationToken)
    {
        SqlParameter jokeIdParam = new SqlParameter("@jokeId", jokeId);
        SqlParameter userIdParam = new SqlParameter("@userId", userId);
        SqlParameter emotionParam = new SqlParameter("@emotion", emotion);
        await _dbContext.Database.ExecuteSqlRawAsync(
            "EXECUTE dbo.AddEmotionReaction @jokeId, @userId, @emotion",
            jokeIdParam,
            userIdParam,
            emotionParam);

        return await GetJokeById(jokeId, cancellationToken);
    }

    public async Task<IReadOnlyList<Joke>> GetLatestJokes(CancellationToken cancellationToken)
    {
        return await _dbContext.Jokes
                .Where(j => j.ReleasedDate != null)
                .OrderByDescending(j => j.ReleasedDate)
                .Include(j => j.User)
                .Include(j => j.Tags)
                .Include(j => j.EmotionCounters)
                .AsNoTracking()
                .ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<Joke>> GetLatestJokes(int page, int pageSize, CancellationToken cancellationToken)
    {
        return await _dbContext.Jokes
                .Where(j => j.ReleasedDate != null)
                .OrderByDescending(j => j.ReleasedDate)
                .Include(j => j.User)
                .Include(j => j.Tags)
                .Include(j => j.EmotionCounters)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .AsNoTracking()
                .ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<Joke>> GetMostPopularJokes(CancellationToken cancellationToken)
    {
        return await _dbContext.Jokes
                .Where(j => j.ReleasedDate != null)
                .OrderByDescending(j => j.ResponseSum)
                .Include(j => j.User)
                .Include(j => j.Tags)
                .Include(j => j.EmotionCounters)
                .AsNoTracking()
                .ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<Joke>> GetJokesByUser(int userId, JokesByUserListMode mode, CancellationToken cancellationToken)
    {
        IQueryable<Joke> jokes = _dbContext.Jokes.Where(j => j.UserId == userId);

        switch (mode)
        {
            case JokesByUserListMode.Published:
                jokes = jokes.Where(j => j.ReleasedDate != null)
                            .OrderByDescending(j => j.ReleasedDate);
                break;
            case JokesByUserListMode.Draft:
                jokes = jokes.Where(j => j.ReleasedDate == null)
                            .OrderByDescending(j => j.CreatedDate);
                break;
            default:
                jokes = jokes.OrderByDescending(j => j.ReleasedDate)
                            .ThenByDescending(j => j.CreatedDate);
                break;
        }

        return await jokes.Include(j => j.User)
                        .Include(j => j.Tags)
                        .Include(j => j.EmotionCounters)
                        .AsNoTracking()
                        .ToListAsync(cancellationToken);
    }
}
