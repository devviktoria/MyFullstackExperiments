using Microsoft.Extensions.DependencyInjection;

namespace jcdataservice.DataServiceRegistration;

public static class RegisterDataServices
{
    public static IServiceCollection AddDataServices(this IServiceCollection services)
    {
        services.AddScoped<IJokeDataService, JokeDataService>();

        return services;
    }
}
