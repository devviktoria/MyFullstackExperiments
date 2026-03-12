import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { JokeSummary } from "@/interfaces/jokesummary.data";
import styles from "./Joke.module.css";
import React from "react";

interface JokeCardProps {
  joke: JokeSummary;
}

const emojiCharacters = [
  { emotion: "sleepy", emoji: "😴" },
  { emotion: "none", emoji: "😐" },
  { emotion: "happy", emoji: "😀" },
  { emotion: "lol", emoji: "😁" },
  { emotion: "lshic", emoji: "🤣" },
];

export default function JokeCard({ joke }: JokeCardProps) {
  const cardColor = React.useMemo(() => {
    const colors = ["yellow", "red", "blue"] as const;
    return colors[Math.floor(Math.random() * colors.length)];
  }, []);

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

        <div className={styles.jokeCardEmotions}>
          {emojiCharacters.map((e) => (
            <Badge
              key={e.emotion}
              badgeContent={getEmotionCounter(e.emotion)}
              color="error"
              overlap="circular"
              showZero
            >
              <span className={styles.jokeEmoji}>{e.emoji}</span>
            </Badge>
          ))}
        </div>

        <Stack direction="row" spacing={1}>
          {joke.tags.map((tag) => (
            <Chip key={tag} label={tag} variant="outlined" />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
