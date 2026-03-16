"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

import styles from "@/components/jokes/Joke.module.css";
import { useCurrentUserContext } from "@/lib/fakeuserauth/fakeauthcontext";
import { UserSummary } from "@/interfaces/usersummary.data";
import { JokeSummary } from "@/interfaces/jokesummary.data";
import {
  GetUserDraftJokes,
  GetUserPublishedJokes,
} from "@/lib/user/userprofile.service";
import JokeCard from "../jokes/JokeCard";

interface UserProfileProps {
  userId: number;
}

export default function UserProfile({ userId }: UserProfileProps) {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const { user, isSignedIn } = useCurrentUserContext();
  const isDraftsVisible = isSignedIn && user.id === userId;

  const [tabIndex, setTabIndex] = React.useState(
    isDraftsVisible && tabParam === "drafts" ? 1 : 0,
  );

  const [publishedJokes, setPublishedJokes] = useState<JokeSummary[]>([]);
  const [publishedLoaded, setPublishedLoaded] = useState(false);
  const [draftJokes, setDraftJokes] = useState<JokeSummary[]>([]);
  const [draftLoaded, setDraftLoaded] = useState(false);

  let requestedUser: UserSummary | undefined = undefined;

  if (isSignedIn && user.id === userId) {
    requestedUser = user;
  } else {
    // We have to query the user, but this is not implemented yet!
    // let's have an undefined user for now
    requestedUser = undefined;
  }

  const handleTabChange = (
    event: React.SyntheticEvent,
    newTabIndex: number,
  ) => {
    setTabIndex(newTabIndex);

    if (newTabIndex === 0) {
      setPublishedLoaded(false);
    }
  };

  useEffect(() => {
    async function loadPublished() {
      try {
        const jokes = await GetUserPublishedJokes(userId);
        setPublishedJokes(jokes);
        setPublishedLoaded(true);
      } catch (err) {
        console.error(err);
      }
    }

    async function loadDrafts() {
      try {
        const jokes = await GetUserDraftJokes(userId);
        setDraftJokes(jokes);
        setDraftLoaded(true);
      } catch (err) {
        console.error(err);
      }
    }

    if (tabIndex === 0 && !publishedLoaded) {
      loadPublished();
    }

    if (tabIndex === 1 && isDraftsVisible && !draftLoaded) {
      loadDrafts();
    }
  }, [tabIndex, userId, isDraftsVisible]);

  if (!requestedUser) {
    return (
      <Typography
        variant="body1"
        gutterBottom
        align="center"
        sx={{ mt: 2, fontWeight: 500 }}
      >
        Failed to load user!
      </Typography>
    );
  }

  return (
    <Box sx={{ width: "75%", typography: "body1", mx: "auto", mt: 2 }}>
      <Stack spacing={2}>
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{ mt: 2, fontWeight: 500 }}
        >
          {user.name}
        </Typography>
        <TabContext value={tabIndex}>
          <Box sx={{ borderBottom: 2, borderColor: "divider" }}>
            <TabList onChange={handleTabChange}>
              <Tab label="Published Jokes" value={0} />
              {isDraftsVisible ? <Tab label="Drafts" value={1} /> : null}
            </TabList>
          </Box>
          <TabPanel value={0}>
            {publishedJokes.length > 0 ? (
              <section className={styles.jokelist}>
                {publishedJokes.map((joke) => (
                  <JokeCard key={joke.jokeId} joke={joke} />
                ))}
              </section>
            ) : (
              <Typography
                variant="body1"
                gutterBottom
                align="center"
                sx={{ mt: 2, fontWeight: 500 }}
              >
                No jokes yet.
              </Typography>
            )}
          </TabPanel>
          {isDraftsVisible ? (
            <TabPanel value={1}>
              {draftJokes.length > 0 ? (
                <section className={styles.jokelist}>
                  {draftJokes.map((joke) => (
                    <JokeCard
                      key={joke.jokeId}
                      joke={joke}
                      isJokeEmotionsVisible={false}
                      editHref={`/jokeupsert/${joke.jokeId}?returnTo=drafts`}
                    />
                  ))}
                </section>
              ) : (
                <Typography
                  variant="body1"
                  gutterBottom
                  align="center"
                  sx={{ mt: 2, fontWeight: 500 }}
                >
                  No jokes yet.
                </Typography>
              )}
            </TabPanel>
          ) : null}
        </TabContext>
      </Stack>
    </Box>
  );
}
