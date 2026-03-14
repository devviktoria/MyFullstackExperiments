import { JokeReaction } from "@/types/jokereaction.data"
import { JokeSummary } from "@/interfaces/jokesummary.data"
import { JokeReactionUpdate } from "@/interfaces/jokereactionupdate.data";
import { JokeUpsertModel } from "@/interfaces/jokeupsertmodel.data";

const jokeBaseUrl = "http://localhost:5235/api/joke";
const upsertJokeUrl: string = 'upsert';

export async function UpdateJokeReaction(
    jokeReaction: JokeReaction,
    userId: number
): Promise<JokeSummary> {
    const counterUpdate: JokeReactionUpdate = {
        jokeId: jokeReaction.jokeId,
        userId,
        emotion: jokeReaction.emotion
    }

    const response = await fetch(
        `${jokeBaseUrl}/${jokeReaction.jokeId}/reaction`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(counterUpdate)
        }
    )

    if (!response.ok) {
        throw new Error("Failed to update joke reaction")
    }

    const jokeSummary = await response.json()

    return {
        ...jokeSummary,
        text: jokeSummary.text.replace(/\\n/g, "\n")
    }
}

export async function GetNewJokeUpsertData(userId: number): Promise<JokeUpsertModel> {
    const result = await fetch(`${jokeBaseUrl}/${upsertJokeUrl}`);
    if (!result.ok) {
        throw new Error("Failed to fetch jokes");
    }

    const joke: JokeUpsertModel = await result.json();
    joke.userId = userId;
    return joke;
}

export async function GetJokeUpsertData(id: number): Promise<JokeUpsertModel> {
    const result = await fetch(`${jokeBaseUrl}/${id}/${upsertJokeUrl}`);
    if (!result.ok) {
        throw new Error("Failed to fetch jokes");
    }

    return await result.json();
}

export async function CreateJoke(joke: JokeUpsertModel): Promise<void> {

    const response = await fetch(
        jokeBaseUrl,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(joke)
        }
    )

    if (!response.ok) {
        throw new Error("Failed to create joke")
    }
}

export async function UpdateJoke(joke: JokeUpsertModel): Promise<void> {

    const response = await fetch(
        `${jokeBaseUrl}/${joke.jokeId}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(joke)
        }
    )

    if (!response.ok) {
        throw new Error("Failed to update joke")
    }
}
