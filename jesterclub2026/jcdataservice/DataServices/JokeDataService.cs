using jcdatabase.DataProviderInterfaces;
using jcdatabase.Models;
using jcdataservice.Dto;

namespace jcdataservice;

public class JokeDataService : IJokeDataService
{
    private IJokeDataProvider jokeDataProvider;

    public JokeDataService(IJokeDataProvider dataProvider)
    {
        jokeDataProvider = dataProvider;
    }

    public JokeUpsertDto GetNewJokeUpsertData()
    {
        return new JokeUpsertDto(0, string.Empty, 0, string.Empty, DateTime.Now, new List<string>());
    }

    public async Task<JokeUpsertDto?> GetJokeUpsertData(int id, CancellationToken cancellationToken)
    {
        var joke = await jokeDataProvider.GetJokeUpsertData(id, cancellationToken);
        if (joke is null)
        {
            return null;
        }

        return new JokeUpsertDto(
                    joke.JokeId,
                    joke.JokeText,
                    joke.UserId,
                    joke.Source ?? "",
                    joke.CreatedDate,
                    joke.Tags is null ? new List<string>() : joke.Tags.Select(tag => tag.Name)
                    );
    }

    public async Task<IEnumerable<JokeSummaryDto>> GetLatestJokes(CancellationToken cancellationToken)
    {
        var latestJokes = await jokeDataProvider.GetLatestJokes(cancellationToken);

        return latestJokes.Select(joke => new JokeSummaryDto(
                                            joke.JokeId,
                                            joke.JokeText,
                                            joke.User is null ? "" : joke.User.UserName,
                                            joke.Source ?? "",
                                            joke.Tags is null ? new List<string>() : joke.Tags.Select(tag => tag.Name),
                                            joke.EmotionCounters!.Select(counter => new EmotionResponseDto(counter.Emotion, counter.Counter))
        ));
    }


}
