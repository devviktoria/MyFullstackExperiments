using jcdatabase.DataAccess;
using jcdatabase.DataProviderInterfaces;
using jcdatabase.Models;
using Microsoft.EntityFrameworkCore;

namespace jcdatabase.DataProviders;

public class TagDataProvider : ITagDataProvider
{
    private readonly JesterClubDbContext _dbContext;

    public TagDataProvider(JesterClubDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<Tag>> MapTags(IEnumerable<string> tagNames, CancellationToken cancellationToken)
    {
        var normalizedTags = tagNames
            .Select(t => t.Trim().ToLowerInvariant())
            .Distinct()
            .ToList();

        var existingTags = await _dbContext.Tags
            .Where(t => normalizedTags.Contains(t.Name))
            .ToListAsync(cancellationToken);

        var newTags = normalizedTags
            .Where(t => !existingTags.Any(et => et.Name == t))
            .Select(t => new Tag { Name = t })
            .ToList();

        _dbContext.Tags.AddRange(newTags);

        return existingTags.Concat(newTags).ToList();
    }
}

