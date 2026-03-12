
import { JokeSummary } from '../interfaces/jokesummary.data';

const jokeBaseUrl = 'http://localhost:5235/api/joke/';
const latestJokesUrl = jokeBaseUrl + 'GetLatestJokes';

export async function GetLatestJokes(): Promise<JokeSummary[]> {
  const result = await fetch(latestJokesUrl);
  if (!result.ok) {
    throw new Error("Failed to fetch jokes");
  }

  const jokes: JokeSummary[] = await result.json();

  return jokes.map(j => ({
    ...j,
    text: j.text.replace(/\\n/g, '\n')
  }));
}


