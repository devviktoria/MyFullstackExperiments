namespace jcdataservice.Dto;

public record JokeSummaryDto(
    int JokeId,
    string Text,
    int? AuthorId,
    string AuthorName,
    string Source,
    IEnumerable<string> Tags,
    IEnumerable<EmotionResponseDto> EmotionResponses
);
