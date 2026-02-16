using jcdataservice.Dto;

namespace jcdataservice;

public interface IJokeDataService
{
    public JokeUpsertDto GetNewJokeUpsertData();

    public Task<JokeUpsertDto?> GetJokeUpsertData(int id, CancellationToken cancellationToken);

    public Task CreateJoke(JokeUpsertDto jokeUpsertDto, CancellationToken cancellationToken);

    public Task UpdateJoke(JokeUpsertDto jokeUpsertDto, CancellationToken cancellationToken);

    public Task<JokeSummaryDto?> UpdateJokeEmotionCounters(JokeEmotionUpdateDto jokeEmotionUpdateDto, CancellationToken cancellationToken);

    public Task<IEnumerable<JokeSummaryDto>> GetLatestJokes(CancellationToken cancellationToken);
}
