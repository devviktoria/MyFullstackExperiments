using jcdatabase.DataProviderInterfaces;
using jcdatabase.Models;
using jcdataservice.DataServiceInterfaces;
using jcdataservice.Dto;
using jcdomain;

namespace jcdataservice;

public class UserDataService : IUserDataService
{
    private IJokeDataProvider _jokeDataProvider;
    private IUserDataProvider _userDataProvider;

    public UserDataService(IUserDataProvider userDataProvider, IJokeDataProvider jokeDataProvider)
    {
        _userDataProvider = userDataProvider;
        _jokeDataProvider = jokeDataProvider;
    }

    public async Task<UserInformationDto?> GetUserInformation(int userId, CancellationToken cancellationToken)
    {
        User? user = await _userDataProvider.GetUserInformation(userId, cancellationToken);
        if (user is null)
        {
            return null;
        }

        return new UserInformationDto(user.UserId, user.UserName, user.UserEmail);
    }

    public async Task<IEnumerable<JokeSummaryDto>> GetPublishedJokes(int userId, CancellationToken cancellationToken)
    {
        var publishedJokes = await _jokeDataProvider.GetJokesByUser(userId, JokesByUserListMode.Published, cancellationToken);
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
        var draftJokes = await _jokeDataProvider.GetJokesByUser(userId, JokesByUserListMode.Draft, cancellationToken);
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
