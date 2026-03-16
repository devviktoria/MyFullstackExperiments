import React from "react";
import { useState } from "react";

import Link from "next/link";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import styles from "./Joke.module.css";

import { JokeSummary } from "@/interfaces/jokesummary.data";
import { JokeReaction } from "@/types/jokereaction.data";
import { useCurrentUserContext } from "@/lib/fakeuserauth/fakeauthcontext";

interface JokeCardProps {
  joke: JokeSummary;
  onReaction?: (reaction: JokeReaction) => void;
  loading?: boolean;
  isJokeEmotionsVisible?: boolean;
  editHref?: string;
}

const emojiCharacters = [
  { emotion: "sleepy", emoji: "😴" },
  { emotion: "none", emoji: "😐" },
  { emotion: "happy", emoji: "😀" },
  { emotion: "lol", emoji: "😁" },
  { emotion: "lshic", emoji: "🤣" },
];

export default function JokeCard({
  joke,
  onReaction,
  loading,
  isJokeEmotionsVisible = true,
  editHref,
}: JokeCardProps) {
  const cardColor = React.useMemo(() => {
    const colors = ["yellow", "red", "blue"] as const;
    return colors[Math.floor(Math.random() * colors.length)];
  }, []);

  const { isSignedIn } = useCurrentUserContext();
  const [spinnerPos, setSpinnerPos] = useState<{ x: number; y: number } | null>(
    null,
  );

  function getEmotionCounter(emotion: string) {
    return (
      joke.emotionResponses.find((er) => er.emotion === emotion)?.counter ?? 0
    );
  }

  return (
    <Card
      raised={true}
      sx={{
        backgroundColor: `jokeCard.${cardColor}`,
      }}
    >
      <CardContent>
        <Typography variant="body1">{joke.text}</Typography>
        <Typography variant="body2" align="right" sx={{ fontWeight: "bold" }}>
          {joke.author}
        </Typography>
        {joke.source && (
          <Typography
            variant="body2"
            align="right"
            sx={{ typography: "caption" }}
          >
            (Source:{joke.source})
          </Typography>
        )}
        {isJokeEmotionsVisible ? (
          <div className={styles.jokeCardEmotions}>
            {emojiCharacters.map((e) => (
              <Badge
                key={e.emotion}
                badgeContent={getEmotionCounter(e.emotion)}
                color="error"
                overlap="circular"
                showZero
                onClick={
                  onReaction && isSignedIn
                    ? (event) => {
                        setSpinnerPos({
                          x: event.clientX,
                          y: event.clientY,
                        });

                        onReaction({
                          jokeId: joke.jokeId,
                          emotion: e.emotion,
                        });
                      }
                    : undefined
                }
              >
                <span className={styles.jokeEmoji}>{e.emoji}</span>
              </Badge>
            ))}
          </div>
        ) : null}
        <Stack direction="row" spacing={1}>
          {joke.tags.map((tag) => (
            <Chip key={tag} label={tag} size="small" variant="filled" />
          ))}
        </Stack>
        {loading && spinnerPos && (
          <div
            className={styles.floatingSpinner}
            style={{
              left: spinnerPos.x,
              top: spinnerPos.y,
            }}
          >
            <CircularProgress size={20} thickness={5} />
          </div>
        )}
      </CardContent>
      {editHref && (
        <CardActions>
          <Link href={editHref}>
            <Button variant="contained" disableElevation>
              Edit
            </Button>
          </Link>
        </CardActions>
      )}
    </Card>
  );
}
