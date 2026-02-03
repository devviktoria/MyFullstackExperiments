using System;
using jcdatabase.Models;

namespace jcdatabase.DataProviderInterfaces;

public interface ITagDataProvider
{
    public Task<List<Tag>> MapTags(IEnumerable<string> tagNames, CancellationToken cancellationToken);
}
