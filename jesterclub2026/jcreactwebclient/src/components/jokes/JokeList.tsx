"use client";

import { useEffect, useRef, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

import { JokeReaction } from "@/types/jokereaction.data";
import { JokeSummary } from "@/interfaces/jokesummary.data";

import { UpdateJokeReaction } from "@/lib/joke/jokeeditor.service";
import { GetLatestJokes } from "@/lib/joke/jokelisting.service";

import { useCurrentUserContext } from "@/lib/fakeuserauth/fakeauthcontext";

import styles from "./Joke.module.css";
import JokeCard from "./JokeCard";

export default function JokeList() {
  const [jokes, setJokes] = useState<JokeSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMap, setLoadingMap] = useState<Record<number, boolean>>({});
  const { user, isSignedIn } = useCurrentUserContext();

  const loaderRef = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

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
        const jokes = await GetLatestJokes(1);
        setJokes(jokes);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  useEffect(() => {
    if (page === 1) return;

    async function loadMore() {
      setIsFetchingMore(true);

      try {
        const data = await GetLatestJokes(page);

        setJokes((prev) => [...prev, ...data]);
        setHasMore(data.length > 0);
      } catch (err) {
        console.error(err);
      } finally {
        setIsFetchingMore(false);
      }
    }

    loadMore();
  }, [page]);

  useEffect(() => {
    if (!loaderRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && !isFetchingMore) {
          setPage((prev) => prev + 1);
        }
      },
      {
        threshold: 1,
      },
    );

    observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [isFetchingMore, hasMore]);

  return (
    <section className={styles.jokelist}>
      {loading ? (
        <CircularProgress />
      ) : (
        jokes.map((joke) => (
          <JokeCard
            key={joke.jokeId}
            joke={joke}
            onReaction={handleReaction}
            loading={loadingMap[joke.jokeId]}
          />
        ))
      )}
      <div ref={loaderRef} />

      {isFetchingMore && <CircularProgress />}
    </section>
  );
}
