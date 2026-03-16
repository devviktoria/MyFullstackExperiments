using jcdatabase.DataProviderInterfaces;
using jcdataservice.DataServiceInterfaces;
using jcdataservice.Dto;
using jcdomain;

namespace jcdataservice;

public class UserDataService : IUserDataService
{
    private IJokeDataProvider jokeDataProvider;

    public UserDataService(IJokeDataProvider dataProvider)
    {
        jokeDataProvider = dataProvider;
    }

    public async Task<IEnumerable<JokeSummaryDto>> GetPublishedJokes(int userId, CancellationToken cancellationToken)
    {
        var publishedJokes = await jokeDataProvider.GetJokesByUser(userId, JokesByUserListMode.Published, cancellationToken);
        return publishedJokes.Select(joke => new JokeSummaryDto(
                                    joke.JokeId,
                                    joke.JokeText,
                                    joke.User is null ? "" : joke.User.UserName,
                                    joke.Source ?? "",
                                    joke.Tags is null ? new List<string>() : joke.Tags.Select(tag => tag.Name),
                                    joke.EmotionCounters!.Select(counter => new EmotionResponseDto(counter.Emotion, counter.Counter))
                ));

    }

    public async Task<IEnumerable<JokeSummaryDto>> GetDraftJokes(int userId, CancellationToken cancellationToken)
    {
        var draftJokes = await jokeDataProvider.GetJokesByUser(userId, JokesByUserListMode.Draft, cancellationToken);
        return draftJokes.Select(joke => new JokeSummaryDto(
                                    joke.JokeId,
                                    joke.JokeText,
                                    joke.User is null ? "" : joke.User.UserName,
                                    joke.Source ?? "",
                                    joke.Tags is null ? new List<string>() : joke.Tags.Select(tag => tag.Name),
                                    joke.EmotionCounters!.Select(counter => new EmotionResponseDto(counter.Emotion, counter.Counter))
                ));
    }
}
