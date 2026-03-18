namespace jcdataservice.Dto;

public record class ResponseStatisticsDTO(List<string> Days, List<int> ResponseCounts);
