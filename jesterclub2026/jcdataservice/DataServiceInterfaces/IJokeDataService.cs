using jcdataservice.Dto;

namespace jcdataservice;

public interface IJokeDataService
{
    public Task<IEnumerable<JokeSummaryDto>> GetLatestJokes(CancellationToken cancellationToken);
}
