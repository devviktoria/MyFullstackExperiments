using jcdatabase.Models;
using jcdomain;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace jcdatabase.DataAccess;

public class JesterClubDbContext : DbContext
{
    public DbSet<User> Users => Set<User>();

    public DbSet<Tag> Tags => Set<Tag>();

    public DbSet<Joke> Jokes => Set<Joke>();

    public DbSet<EmotionCounter> EmotionCounters => Set<EmotionCounter>();

    public DbSet<ResponseStatistic> ResponseStatistics => Set<ResponseStatistic>();

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        string? dbConnectionString = Environment.GetEnvironmentVariable("ConnectionStrings__jcwebapi");

        if (dbConnectionString is null)
        {
            throw new NullReferenceException("The dbConnectionString ConnectionStrings__jcwebapi is null!");
        }

        optionsBuilder.UseSqlServer(dbConnectionString)
            .LogTo(Console.WriteLine, [DbLoggerCategory.Database.Command.Name], LogLevel.Information)
            .EnableSensitiveDataLogging(); // add connection string
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<EmotionCounter>()
                    .ToTable(b =>
                    b.HasCheckConstraint(
                        "CK_EmotionValue",
                        $"[Emotion] IN ('{string.Join("','", Emotions.Values)}')"));
    }

}
