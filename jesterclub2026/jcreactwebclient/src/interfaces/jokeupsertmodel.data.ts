export interface JokeUpsertModel {
    jokeId: number,
    text: string,
    source: string,
    createdDate: Date,
    releasedDate: Date | null,
    userId: number,
    tags: string[]
}
