using jcdatabase.DataProviderInterfaces;
using jcdatabase.DataProviders;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace jcdatabase.DataAccess;

public static class RegisterJcDbContextExtentsion
{
    public static IServiceCollection AddSqlServerServices(
            this IServiceCollection services,
            string connectionString)
    {
        services.AddDbContext<JesterClubDbContext>(options =>
            options.UseSqlServer(connectionString));

        services.AddScoped<IJokeDataProvider, JokeDataProvider>();

        return services;
    }
}
