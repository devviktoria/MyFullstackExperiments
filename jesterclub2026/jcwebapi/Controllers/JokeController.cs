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

        [HttpGet("upsert", Name = nameof(GetNewJokeUpsertData))]
        public ActionResult<JokeUpsertDto> GetNewJokeUpsertData()
        {
            var dto = _jokeDataService.GetNewJokeUpsertData();
            return Ok(dto);
        }

        [HttpGet("{id}/upsert")]
        public async Task<ActionResult<JokeUpsertDto>> GetJokeUpsertData(int id, CancellationToken cancellationToken)
        {
            var jokeUpsertDto = await _jokeDataService.GetJokeUpsertData(id, cancellationToken);
            if (jokeUpsertDto is null)
            {
                return NotFound();
            }

            return Ok(jokeUpsertDto);
        }

        [HttpGet(nameof(GetLatestJokes), Name = nameof(GetLatestJokes))]
        public async Task<IEnumerable<JokeSummaryDto>> GetLatestJokes(CancellationToken cancellationToken)
        {
            return await _jokeDataService.GetLatestJokes(cancellationToken);
        }
    }
}
