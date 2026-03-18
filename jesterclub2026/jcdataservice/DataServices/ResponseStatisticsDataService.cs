using jcdatabase.DataProviderInterfaces;
using jcdataservice.DataServiceInterfaces;
using jcdataservice.Dto;

namespace jcdataservice.DataServices;

public class ResponseStatisticsDataService : IResponseStatisticsDataService
{
    private IResponseStatisticDataProvider _responseStatisticDataProvider;

    public ResponseStatisticsDataService(IResponseStatisticDataProvider responseStatisticDataProvider)
    {
        _responseStatisticDataProvider = responseStatisticDataProvider;
    }

    public async Task<ResponseStatisticsDTO> GetResponseStatistics(
                        int jokeId,
                        int days,
                        CancellationToken cancellationToken)
    {
        var end = DateOnly.FromDateTime(DateTime.UtcNow);
        var start = end.AddDays(-days + 1);

        var data = await _responseStatisticDataProvider.GetResponseStatistics(jokeId, start, end, cancellationToken);

        var dayLabels = new List<string>();
        var responseCounts = new List<int>();

        for (var day = start; day <= end; day = day.AddDays(1))
        {
            dayLabels.Add(day.ToString("yyyy-MM-dd"));

            if (data.TryGetValue(day, out var value))
                responseCounts.Add(value);
            else
                responseCounts.Add(0);
        }

        return new ResponseStatisticsDTO(dayLabels, responseCounts);
    }
}
