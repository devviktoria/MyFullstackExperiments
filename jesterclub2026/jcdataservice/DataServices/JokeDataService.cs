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
        return new JokeUpsertDto(0, string.Empty, string.Empty, DateTime.Now, null, 0, new List<string>());
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
                    joke.Source ?? "",
                    joke.CreatedDate,
                    joke.ReleasedDate,
                    joke.UserId,
                    joke.Tags is null ? new List<string>() : joke.Tags.Select(tag => tag.Name)
                    );
    }

    public async Task CreateJoke(JokeUpsertDto jokeUpsertDto, CancellationToken cancellationToken)
    {
        Joke joke = new Joke
        {
            JokeText = jokeUpsertDto.Text,
            Source = jokeUpsertDto.Source,
            CreatedDate = jokeUpsertDto.CreatedDate,
            ReleasedDate = jokeUpsertDto.ReleasedDate,
            ResponseSum = 0,
            UserId = jokeUpsertDto.UserId
        };

        await jokeDataProvider.CreateJoke(joke, jokeUpsertDto.Tags, cancellationToken);
    }

    public async Task UpdateJoke(JokeUpsertDto jokeUpsertDto, CancellationToken cancellationToken)
    {
        Joke joke = new Joke
        {
            JokeId = jokeUpsertDto.JokeId,
            JokeText = jokeUpsertDto.Text,
            Source = jokeUpsertDto.Source,
            CreatedDate = jokeUpsertDto.CreatedDate,
            ReleasedDate = jokeUpsertDto.ReleasedDate,
            UserId = jokeUpsertDto.UserId
        };

        await jokeDataProvider.UpdateJoke(joke, jokeUpsertDto.Tags, cancellationToken);
    }

    public async Task<JokeSummaryDto?> UpdateJokeEmotionCounters(JokeEmotionUpdateDto jokeEmotionUpdateDto, CancellationToken cancellationToken)
    {
        var joke = await jokeDataProvider.UpdateEmotionCounters(
                                            jokeEmotionUpdateDto.JokeId,
                                            jokeEmotionUpdateDto.UserId,
                                            jokeEmotionUpdateDto.Emotion,
                                            cancellationToken);
        if (joke is null)
        {
            return null;
        }

        return new JokeSummaryDto(
                    joke.JokeId,
                    joke.JokeText,
                    joke.User is null ? "" : joke.User.UserName,
                    joke.Source ?? "",
                    joke.Tags is null ? new List<string>() : joke.Tags.Select(tag => tag.Name),
                    joke.EmotionCounters!.Select(counter => new EmotionResponseDto(counter.Emotion, counter.Counter))
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
