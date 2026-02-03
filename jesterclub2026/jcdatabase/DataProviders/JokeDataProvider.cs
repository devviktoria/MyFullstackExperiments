using jcdatabase.DataAccess;
using jcdatabase.DataProviderInterfaces;
using jcdatabase.Models;
using Microsoft.EntityFrameworkCore;

namespace jcdatabase.DataProviders;

public class JokeDataProvider : IJokeDataProvider
{
    private const int LatestJokeCount = 10;
    private const int MostPopularJokeCount = 10;

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

    public async Task<Joke> IncrementEmotionCounter(int jokeId, string emotion)
    {
        throw new NotImplementedException();
    }

    public async Task<IReadOnlyList<Joke>> GetJokesByUser(string mode, int userId, int jokesPerPage, int pageIndex, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }

    public async Task<IReadOnlyList<Joke>> GetLatestJokes(CancellationToken cancellationToken)
    {
        return await _dbContext.Jokes
                .Where(j => j.ReleasedDate != null)
                .OrderByDescending(j => j.ReleasedDate)
                .Take(LatestJokeCount)
                .Include(j => j.User)
                .Include(j => j.Tags)
                .Include(j => j.EmotionCounters)
                .AsNoTracking()
                .ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<Joke>> GetMostPopularJokes(CancellationToken cancellationToken)
    {
        return await _dbContext.Jokes
                .Where(j => j.ReleasedDate != null)
                .OrderByDescending(j => j.ResponseSum)
                .Take(MostPopularJokeCount)
                .Include(j => j.User)
                .Include(j => j.Tags)
                .Include(j => j.EmotionCounters)
                .AsNoTracking()
                .ToListAsync(cancellationToken);
    }
}
