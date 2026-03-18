import { ResponseStatistics } from "@/interfaces/responsestatistics.data";

const responseStatisticsBaseUrl = 'http://localhost:5235/api/responsestatistics/';

export async function GetResponseStatistics(jokeId: number, days: number): Promise<ResponseStatistics> {
    const result = await fetch(`${responseStatisticsBaseUrl}${jokeId}?days=${days}`);
    if (!result.ok) {
        throw new Error("Failed to fetch joke statistics");
    }

    const responseStatistics: ResponseStatistics = await result.json();

    return responseStatistics;
}
