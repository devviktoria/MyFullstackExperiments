using jcdatabase.Models;
using jcdomain;

namespace jcdatabase.DataProviderInterfaces;

public interface IJokeDataProvider
{
    public Task<Joke?> GetJokeById(int id, CancellationToken ct);

    public Task<Joke?> GetJokeUpsertData(int id, CancellationToken ct);

    public Task<IReadOnlyList<Joke>> GetJokesByUser(int userId, JokesByUserListMode mode, CancellationToken cancellationToken);

    public Task<IReadOnlyList<Joke>> GetLatestJokes(CancellationToken cancellationToken);

    public Task<IReadOnlyList<Joke>> GetMostPopularJokes(CancellationToken cancellationToken);

    public Task CreateJoke(Joke joke, IEnumerable<string> tagNames, CancellationToken cancellationToken);

    public Task UpdateJoke(Joke joke, IEnumerable<string> tagNames, CancellationToken cancellationToken);

    public Task Remove(int id);

    public Task<Joke?> UpdateEmotionCounters(int jokeId, int userId, string emotion, CancellationToken cancellationToken);
}
