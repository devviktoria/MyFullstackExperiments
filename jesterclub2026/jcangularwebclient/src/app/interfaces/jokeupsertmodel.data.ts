export interface JokeUpsertModel {
    jokeId: number,
    text: string,
    source: string,
    createdDate: Date,
    releasedDate: Date,
    userId: number,
    tags: string[]
}
