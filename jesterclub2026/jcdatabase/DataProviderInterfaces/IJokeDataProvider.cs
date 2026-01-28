using jcdatabase.Models;

namespace jcdatabase.DataProviderInterfaces;

public interface IJokeDataProvider
{
    public Task<Joke?> GetJokeById(int id, CancellationToken ct);

    public Task<IReadOnlyList<Joke>> GetJokesByUser(string mode, int userId, int jokesPerPage, int pageIndex, CancellationToken cancellationToken);

    public Task<IReadOnlyList<Joke>> GetLatestJokes(CancellationToken cancellationToken);

    public Task<IReadOnlyList<Joke>> GetMostPopularJokes(CancellationToken cancellationToken);

    public Task<Joke> Create(Joke joke);

    public Task Update(Joke joke);

    public Task Remove(int id);

    public Task<Joke> IncrementEmotionCounter(int jokeId, string emotion);
}
