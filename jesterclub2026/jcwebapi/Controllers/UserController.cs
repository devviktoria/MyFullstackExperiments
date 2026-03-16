using jcdataservice.DataServiceInterfaces;
using jcdataservice.Dto;
using Microsoft.AspNetCore.Mvc;

namespace jcwebapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public readonly IUserDataService _userDataService;

        public UserController(IUserDataService userDataService)
        {
            _userDataService = userDataService;
        }

        [HttpGet("{id}/jokes/published")]
        public async Task<IEnumerable<JokeSummaryDto>> GetPublishedJokes(int id, CancellationToken cancellationToken)
        {
            return await _userDataService.GetPublishedJokes(id, cancellationToken);
        }

        [HttpGet("{id}/jokes/drafts")]
        public async Task<IEnumerable<JokeSummaryDto>> GetDraftJokes(int id, CancellationToken cancellationToken)
        {
            return await _userDataService.GetDraftJokes(id, cancellationToken);
        }
    }
}
