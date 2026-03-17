using jcdatabase.Models;

namespace jcdatabase.DataProviderInterfaces;

public interface IUserDataProvider
{
    public Task<User?> GetUserInformation(int userId, CancellationToken cancellationToken);
}
