"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { LineChart } from "@mui/x-charts/LineChart";
import { PieValueType } from "@mui/x-charts/models";
import { PieChart } from "@mui/x-charts/PieChart";

import { JokeSummary } from "@/interfaces/jokesummary.data";
import { ResponseStatistics } from "@/interfaces/responsestatistics.data";
import { useCurrentUserContext } from "@/lib/fakeuserauth/fakeauthcontext";
import { GetResponseStatistics } from "@/lib/joke/responsestatistics.service";
import { GetJokeSummary } from "@/lib/joke/jokelisting.service";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

interface JokeStatisticsProps {
  jokeId?: string;
}

const emotionProps = [
  {
    emotion: "sleepy",
    emoji: "😴",
    color: "var(--mui-palette-jokeEmotionPieChart-sleepy)",
  },
  {
    emotion: "none",
    emoji: "😐",
    color: "var(--mui-palette-jokeEmotionPieChart-none)",
  },
  {
    emotion: "happy",
    emoji: "😀",
    color: "var(--mui-palette-jokeEmotionPieChart-happy)",
  },
  {
    emotion: "lol",
    emoji: "😁",
    color: "var(--mui-palette-jokeEmotionPieChart-lol)",
  },
  {
    emotion: "lshic",
    emoji: "🤣",
    color: "var(--mui-palette-jokeEmotionPieChart-lshic)",
  },
];

export default function JokeStatistics({ jokeId }: JokeStatisticsProps) {
  const { user, isSignedIn } = useCurrentUserContext();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [joke, setJoke] = useState<JokeSummary | undefined>(undefined);
  const [loadingJoke, setLoadingJoke] = useState(true);
  const [sumResponse, setSumResponse] = useState(0);

  const [pieChartData, setPieChartData] = useState<PieValueType[] | undefined>(
    undefined,
  );
  const [isDataVisible, setDataVisible] = useState(false);

  const [range, setRange] = useState<7 | 28 | 60>(7);
  const [responseStatistics, setResponseStatistics] = useState<
    ResponseStatistics | undefined
  >(undefined);
  const [loadingStatistics, setLoadingStatistics] = useState(true);

  function getEmotionCounter(joke: JokeSummary, emotion: string) {
    return (
      joke.emotionResponses.find((er) => er.emotion === emotion)?.counter ?? 0
    );
  }

  useEffect(() => {
    async function load() {
      try {
        const joke = await GetJokeSummary(Number(jokeId));
        setJoke(joke);
        const sumResponse = joke.emotionResponses.reduce(
          (sum, er) => sum + er.counter,
          0,
        );
        setSumResponse(sumResponse);
        const pieChartData = emotionProps.map<PieValueType>((ep) => {
          let counter = getEmotionCounter(joke, ep.emotion);
          const percent = sumResponse > 0 ? (counter / sumResponse) * 100 : 0;
          return {
            value: counter,
            label: (location) =>
              location === "arc"
                ? ep.emoji
                : `${ep.emoji} ${percent.toFixed(0)}%`,
            color: ep.color,
          };
        });
        setPieChartData(pieChartData);
        setDataVisible(isSignedIn && user.userId === joke.authorId);
      } catch (err) {
        setErrorMsg("Load error: " + (err as Error).message);
        setOpenSnackbar(true);
      } finally {
        setLoadingJoke(false);
      }
    }

    load();
  }, [jokeId, isSignedIn, user]);

  useEffect(() => {
    async function load() {
      try {
        const responseStatistics = await GetResponseStatistics(
          Number(jokeId),
          range,
        );
        setResponseStatistics(responseStatistics);
      } catch (err) {
        setErrorMsg("Load error: " + (err as Error).message);
        setOpenSnackbar(true);
      } finally {
        setLoadingStatistics(false);
      }
    }

    if (isDataVisible) load();
  }, [jokeId, isDataVisible, range]);

  return (
    <section>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 2 }}>
            {loadingJoke ? (
              <CircularProgress />
            ) : (
              <Typography sx={{ whiteSpace: "pre-line" }}>
                {joke?.text}
              </Typography>
            )}
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 2, display: "flex", justifyContent: "center" }}>
            {loadingJoke ? (
              <Skeleton variant="circular" width={200} height={200} />
            ) : (
              <Stack direction="column">
                <Typography variant="h6">Reactions</Typography>
                {sumResponse === 0 ? (
                  <>
                    <Typography
                      fontSize={24}
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      🤣
                    </Typography>
                    <Typography variant="body2">No reactions yet</Typography>
                  </>
                ) : (
                  <PieChart
                    series={[
                      {
                        outerRadius: 80,
                        data: pieChartData!,
                        arcLabel: "label",
                      },
                    ]}
                    width={250}
                    height={200}
                  />
                )}
              </Stack>
            )}
          </Paper>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 2 }}>
            {isDataVisible ? (
              loadingStatistics ? (
                <Skeleton variant="rectangular" height={300} />
              ) : (
                responseStatistics && (
                  <Stack direction="column">
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="h6">Activity</Typography>
                      <ToggleButtonGroup
                        value={range}
                        exclusive
                        onChange={(_, newValue) => {
                          if (newValue !== null) setRange(newValue);
                        }}
                        size="small"
                      >
                        <ToggleButton value={7}>7 days</ToggleButton>
                        <ToggleButton value={28}>28 days</ToggleButton>
                        <ToggleButton value={60}>60 days</ToggleButton>
                      </ToggleButtonGroup>
                    </Stack>
                    <LineChart
                      series={[
                        {
                          data: responseStatistics.responseCounts,
                          label: "Interactions",
                        },
                      ]}
                      xAxis={[
                        {
                          scaleType: "point",
                          data: responseStatistics.days,
                        },
                      ]}
                      height={300}
                    />
                  </Stack>
                )
              )
            ) : (
              <Typography align="center">
                Statistics available only for the author.
              </Typography>
            )}
          </Paper>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Link href={isSignedIn ? `/${user.userId}` : "/"}>
            <Button variant="contained">
              {isDataVisible ? "Profile" : "Home"}
            </Button>
          </Link>
        </Grid>
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {errorMsg}
        </Alert>
      </Snackbar>
    </section>
  );
}
