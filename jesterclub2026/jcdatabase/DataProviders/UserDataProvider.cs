using jcdatabase.DataAccess;
using jcdatabase.DataProviderInterfaces;
using jcdatabase.Models;
using Microsoft.EntityFrameworkCore;

namespace jcdatabase.DataProviders;

public class UserDataProvider : IUserDataProvider
{
    private JesterClubDbContext _dbContext;

    public UserDataProvider(JesterClubDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<User?> GetUserInformation(int userId, CancellationToken cancellationToken)
    {
        return await _dbContext.Users.Where(u => u.UserId == userId)
                                    .AsNoTracking()
                                    .FirstOrDefaultAsync(cancellationToken);
    }
}
