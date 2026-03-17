
import { JokeSummary } from '../../interfaces/jokesummary.data';

const jokeBaseUrl = 'http://localhost:5235/api/joke/';
const latestJokesUrl = jokeBaseUrl + 'getlatestjokes';

export async function GetLatestJokes(page: number): Promise<JokeSummary[]> {
  const result = await fetch(`${latestJokesUrl}/${page}`);
  if (!result.ok) {
    throw new Error("Failed to fetch jokes");
  }

  const jokes: JokeSummary[] = await result.json();

  return jokes.map(j => ({
    ...j,
    text: j.text.replace(/\\n/g, '\n')
  }));
}


