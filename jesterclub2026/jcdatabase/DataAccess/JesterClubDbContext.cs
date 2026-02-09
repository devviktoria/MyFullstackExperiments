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

    public JesterClubDbContext() { }

    public JesterClubDbContext(DbContextOptions<JesterClubDbContext> options) : base(options) { }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (optionsBuilder.IsConfigured)
        {
            return;
        }

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

        modelBuilder.Entity<Tag>()
                    .HasIndex(t => t.Name)
                    .IsUnique();


        modelBuilder.Entity<Tag>()
                    .Property(t => t.Name)
                    .HasConversion(
                        v => v.ToLowerInvariant(),
                        v => v
                    );

        // To make sure the trigger works on the Joke table
        // More info here: https://learn.microsoft.com/en-us/ef/core/what-is-new/ef-core-7.0/breaking-changes?tabs=data-annotations%2Cv7#sqlserver-tables-with-triggers
        modelBuilder.Entity<Joke>()
                    .ToTable(tb => tb.UseSqlOutputClause(false));

        modelBuilder.Entity<JokeUserResponse>()
                            .ToTable("JokeUserResponses", b =>
                            b.HasCheckConstraint(
                                "CK_EmotionValue",
                                $"[Emotion] IN ('{string.Join("','", Emotions.Values)}')"));

        modelBuilder.Entity<JokeUserResponse>()
                    .HasIndex(r => new { r.JokeId, r.CreatedAt });

        modelBuilder.Entity<JokeUserResponse>()
                    .HasOne<Joke>()
                    .WithMany()
                    .HasForeignKey(r => r.JokeId);

        modelBuilder.Entity<JokeUserResponse>()
                    .HasOne<User>()
                    .WithMany()
                    .HasForeignKey(r => r.UserId)
                    .OnDelete(DeleteBehavior.NoAction);
    }
}
