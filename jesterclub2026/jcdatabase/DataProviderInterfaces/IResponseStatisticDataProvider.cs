using jcdatabase.Models;

namespace jcdatabase.DataProviderInterfaces;

public interface IResponseStatisticDataProvider
{
    public Task<IDictionary<DateOnly, int>> GetResponseStatistics(
                        int jokeId,
                        DateOnly from,
                        DateOnly till,
                        CancellationToken cancellationToken);
}
