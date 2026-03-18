using jcdatabase.DataAccess;
using jcdatabase.DataProviderInterfaces;
using jcdatabase.Models;
using Microsoft.EntityFrameworkCore;

namespace jcdatabase.DataProviders;

public class ResponseStatisticDataProvider : IResponseStatisticDataProvider
{
    private JesterClubDbContext _dbContext;

    public ResponseStatisticDataProvider(JesterClubDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IDictionary<DateOnly, int>> GetResponseStatistics(
                        int jokeId,
                        DateOnly from,
                        DateOnly till,
                        CancellationToken cancellationToken)
    {
        return await _dbContext.ResponseStatistics
                    .Where(j => j.JokeId == jokeId)
                    .Where(j => j.ResponseDay >= from && j.ResponseDay <= till)
                    .AsNoTracking()
                    .ToDictionaryAsync(j => j.ResponseDay, j => j.Counter, cancellationToken);

    }
}
