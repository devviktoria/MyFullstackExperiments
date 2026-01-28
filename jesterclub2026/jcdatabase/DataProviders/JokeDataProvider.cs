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

    public JokeDataProvider(JesterClubDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Joke?> GetJokeById(int id, CancellationToken ct)
    {
        return await _dbContext.Jokes
            .Include(j => j.User)
            .Include(j => j.Tags)
            .AsNoTracking()
            .FirstOrDefaultAsync(j => j.JokeId == id, ct);
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
                .ToListAsync();
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
                .ToListAsync();
    }

    public async Task<Joke> Create(Joke joke)
    {
        throw new NotImplementedException();
    }

    public async Task Update(Joke joke)
    {
        throw new NotImplementedException();
    }

    public async Task Remove(int id)
    {
        throw new NotImplementedException();
    }

    public async Task<Joke> IncrementEmotionCounter(int jokeId, string emotion)
    {
        throw new NotImplementedException();
    }
}
