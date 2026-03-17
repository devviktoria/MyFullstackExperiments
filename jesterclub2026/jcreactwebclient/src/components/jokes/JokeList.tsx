"use client";

import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { JokeSummary } from "@/interfaces/jokesummary.data";
import { GetLatestJokes } from "@/lib/jokelisting/jokelisting.service";
import styles from "./Joke.module.css";
import JokeCard from "./JokeCard";
import { JokeReaction } from "@/types/jokereaction.data";
import { UpdateJokeReaction } from "@/lib/jokeeditor/jokeeditor.service";
import { useCurrentUserContext } from "@/lib/fakeuserauth/fakeauthcontext";

export default function JokeList() {
  const [jokes, setJokes] = useState<JokeSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMap, setLoadingMap] = useState<Record<number, boolean>>({});
  const { user, isSignedIn } = useCurrentUserContext();

  async function handleReaction(jokeReaction: JokeReaction) {
    if (!isSignedIn) {
      return;
    }

    setLoadingMap((map) => ({
      ...map,
      [jokeReaction.jokeId]: true,
    }));

    try {
      const updatedJoke = await UpdateJokeReaction(jokeReaction, user.userId);

      setJokes((list) =>
        list.map((j) => (j.jokeId === updatedJoke.jokeId ? updatedJoke : j)),
      );
    } finally {
      setLoadingMap((map) => ({
        ...map,
        [jokeReaction.jokeId]: false,
      }));
    }
  }

  useEffect(() => {
    async function load() {
      try {
        const jokes = await GetLatestJokes();
        setJokes(jokes);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <section className={styles.jokelist}>
      {jokes.map((joke) => (
        <JokeCard
          key={joke.jokeId}
          joke={joke}
          onReaction={handleReaction}
          loading={loadingMap[joke.jokeId]}
        />
      ))}
    </section>
  );
}
