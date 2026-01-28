namespace jcdataservice.Dto;

public record JokeSummaryDto(
    int JokeId,
    string Text,
    string Author,
    string Source,
    IEnumerable<string> Tags,
    IEnumerable<EmotionResponseDto> EmotionResponses
);
