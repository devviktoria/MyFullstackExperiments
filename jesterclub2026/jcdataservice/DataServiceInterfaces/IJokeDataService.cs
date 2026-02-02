using jcdataservice.Dto;

namespace jcdataservice;

public interface IJokeDataService
{
    public JokeUpsertDto GetNewJokeUpsertData();

    public Task<JokeUpsertDto?> GetJokeUpsertData(int id, CancellationToken cancellationToken);

    public Task<IEnumerable<JokeSummaryDto>> GetLatestJokes(CancellationToken cancellationToken);
}
