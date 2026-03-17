import { EmotionResponse } from "./emotionresponse.data"

export interface JokeSummary {
    jokeId: number,
    text: string,
    authorId: number,
    authorName: string,
    source: string,
    tags: string[],
    emotionResponses: EmotionResponse[]
}
