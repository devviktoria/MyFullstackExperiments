using jcdataservice;
using jcdataservice.Dto;
using Microsoft.AspNetCore.Mvc;

namespace jcwebapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JokeController : ControllerBase
    {
        private readonly IJokeDataService _jokeDataService;

        public JokeController(IJokeDataService jokeDataService)
        {
            _jokeDataService = jokeDataService;
        }

        [HttpGet(nameof(GetLatestJokes), Name = nameof(GetLatestJokes))]
        public async Task<IEnumerable<JokeSummaryDto>> GetLatestJokes(CancellationToken cancellationToken)
        {
            return await _jokeDataService.GetLatestJokes(cancellationToken);
        }
    }
}
