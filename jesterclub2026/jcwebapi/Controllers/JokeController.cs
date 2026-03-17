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

        [HttpPost("")]
        public async Task<ActionResult> CreateJoke(JokeUpsertDto jokeUpsertDto, CancellationToken cancellationToken)
        {
            await _jokeDataService.CreateJoke(jokeUpsertDto, cancellationToken);
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateJoke(int id, JokeUpsertDto jokeUpsertDto, CancellationToken cancellationToken)
        {
            if (id != jokeUpsertDto.JokeId)
            {
                return BadRequest("ID mismatch");
            }

            await _jokeDataService.UpdateJoke(jokeUpsertDto, cancellationToken);
            return Ok();
        }

        [HttpPatch("{id}/reaction")]
        public async Task<ActionResult<JokeSummaryDto>> UpdateJokeEmotionCounters(int id, JokeEmotionUpdateDto jokeEmotionUpdateDto, CancellationToken cancellationToken)
        {
            if (id != jokeEmotionUpdateDto.JokeId)
            {
                return BadRequest("ID mismatch");
            }

            var jokeSummaryDto = await _jokeDataService.UpdateJokeEmotionCounters(jokeEmotionUpdateDto, cancellationToken);
            if (jokeSummaryDto is null)
            {
                return NotFound();
            }

            return Ok(jokeSummaryDto);
        }

        //I kept this for backward comaptibility with the Angular client
        [HttpGet(nameof(GetLatestJokes), Name = nameof(GetLatestJokes))]
        public async Task<IEnumerable<JokeSummaryDto>> GetLatestJokes(CancellationToken cancellationToken)
        {
            return await _jokeDataService.GetLatestJokes(cancellationToken);
        }

        [HttpGet("getlatestjokes/{page}")]
        public async Task<IEnumerable<JokeSummaryDto>> GetLatestJokes(int page, CancellationToken cancellationToken)
        {
            return await _jokeDataService.GetLatestJokes(page, cancellationToken);
        }
    }
}
