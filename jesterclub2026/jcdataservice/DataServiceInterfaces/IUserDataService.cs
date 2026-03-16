using jcdataservice.Dto;

namespace jcdataservice.DataServiceInterfaces;

public interface IUserDataService
{
    public Task<IEnumerable<JokeSummaryDto>> GetPublishedJokes(int userId, CancellationToken cancellationToken);

    public Task<IEnumerable<JokeSummaryDto>> GetDraftJokes(int userId, CancellationToken cancellationToken);
}
