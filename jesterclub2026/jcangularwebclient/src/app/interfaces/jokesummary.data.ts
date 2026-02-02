import { EmotionResponse } from "./emotionresponse.data"

export interface JokeSummary {
    jokeId: number,
    text: string,
    author: string,
    source: string,
    tags: string[],
    emotionResponses: EmotionResponse[]
}
