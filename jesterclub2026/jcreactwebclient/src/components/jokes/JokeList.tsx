"use client";

import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { JokeSummary } from "@/interfaces/jokesummary.data";
import { GetLatestJokes } from "@/lib/jokelisting/jokelisting.service";
import styles from "./Joke.module.css";
import JokeCard from "./JokeCard";

export default function JokeList() {
  const [jokes, setJokes] = useState<JokeSummary[]>([]);
  const [loading, setLoading] = useState(true);

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
        <JokeCard key={joke.jokeId} joke={joke} />
      ))}
    </section>
  );
}
