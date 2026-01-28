using jcdatabase.DataProviderInterfaces;
using jcdataservice.Dto;

namespace jcdataservice;

public class JokeDataService : IJokeDataService
{
    private IJokeDataProvider jokeDataProvider;

    public JokeDataService(IJokeDataProvider dataProvider)
    {
        jokeDataProvider = dataProvider;
    }

    public async Task<IEnumerable<JokeSummaryDto>> GetLatestJokes(CancellationToken cancellationToken)
    {
        var latestJokes = await jokeDataProvider.GetLatestJokes(cancellationToken);

        return latestJokes.Select(joke => new JokeSummaryDto(
                                            joke.JokeId,
                                            joke.JokeText,
                                            joke.User is null ? "" : joke.User.UserName,
                                            joke.Source ?? "",
                                            joke.Tags is null ? [""] : joke.Tags.Select(tag => tag.Name),
                                            joke.EmotionCounters!.Select(counter => new EmotionResponseDto(counter.Emotion, counter.Counter))
        ));
    }
}
