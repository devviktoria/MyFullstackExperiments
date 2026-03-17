import { UserSummary } from '@/interfaces/usersummary.data';
import { JokeSummary } from '../../interfaces/jokesummary.data';

const userBaseUrl = 'http://localhost:5235/api/user/';

export async function GetUserInformation(userId: number): Promise<UserSummary> {
    const result = await fetch(`${userBaseUrl}${userId}`);
    if (!result.ok) {
        throw new Error("Failed to fetch user information!");
    }

    const userInfo = await result.json();
    return userInfo;
}

export async function GetUserPublishedJokes(userId: number): Promise<JokeSummary[]> {
    const result = await fetch(`${userBaseUrl}${userId}/jokes/published`);
    if (!result.ok) {
        throw new Error("Failed to fetch jokes!");
    }

    const jokes: JokeSummary[] = await result.json();

    return jokes.map(j => ({
        ...j,
        text: j.text.replace(/\\n/g, '\n')
    }));
}

export async function GetUserDraftJokes(userId: number): Promise<JokeSummary[]> {
    const result = await fetch(`${userBaseUrl}${userId}/jokes/drafts`);
    if (!result.ok) {
        throw new Error("Failed to fetch jokes!");
    }

    const jokes: JokeSummary[] = await result.json();

    return jokes.map(j => ({
        ...j,
        text: j.text.replace(/\\n/g, '\n')
    }));
}