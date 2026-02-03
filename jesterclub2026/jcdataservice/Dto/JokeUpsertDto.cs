namespace jcdataservice.Dto;

public record JokeUpsertDto(
    int JokeId,
    string Text,
    string Source,
    DateTime CreatedDate,
    DateTime? ReleasedDate,
    int UserId,
    IEnumerable<string> Tags
);
