import { JokeReaction } from "../../types/jokereaction.data"
import { JokeSummary } from "../../interfaces/jokesummary.data"
import { JokeReactionUpdate } from "../../interfaces/jokereactionupdate.data";

const jokeBaseUrl = "http://localhost:5235/api/joke"

export async function updateJokeReaction(
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
