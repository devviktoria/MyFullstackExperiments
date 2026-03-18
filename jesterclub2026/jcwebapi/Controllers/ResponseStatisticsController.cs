using jcdataservice.DataServiceInterfaces;
using jcdataservice.Dto;
using Microsoft.AspNetCore.Mvc;

namespace jcwebapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResponseStatisticsController : ControllerBase
    {
        private IResponseStatisticsDataService _responseStatisticDataService;

        public ResponseStatisticsController(IResponseStatisticsDataService responseStatisticDataService)
        {
            _responseStatisticDataService = responseStatisticDataService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ResponseStatisticsDTO>> GetResponseStatistics(
                        int id,
                        CancellationToken cancellationToken,
                        [FromQuery] int days = 7)
        {
            return Ok(await _responseStatisticDataService.GetResponseStatistics(id, days, cancellationToken));
        }
    }
}
