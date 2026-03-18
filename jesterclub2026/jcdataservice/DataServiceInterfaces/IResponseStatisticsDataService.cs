using jcdataservice.Dto;

namespace jcdataservice.DataServiceInterfaces;

public interface IResponseStatisticsDataService
{
    public Task<ResponseStatisticsDTO> GetResponseStatistics(
                            int jokeId,
                            int days,
                            CancellationToken cancellationToken);
}
