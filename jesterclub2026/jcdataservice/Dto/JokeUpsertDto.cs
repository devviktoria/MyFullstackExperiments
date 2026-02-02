namespace jcdataservice.Dto;

public record JokeUpsertDto(
    int JokeId,
    string Text,
    int UserId,
    string Source,
    DateTime CreatedDate,
    IEnumerable<string> Tags
);
