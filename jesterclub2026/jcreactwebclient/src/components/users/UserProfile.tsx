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
import Skeleton from "@mui/material/Skeleton";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import styles from "@/components/jokes/Joke.module.css";
import { useCurrentUserContext } from "@/lib/fakeuserauth/fakeauthcontext";
import { UserSummary } from "@/interfaces/usersummary.data";
import { JokeSummary } from "@/interfaces/jokesummary.data";
import {
  GetUserDraftJokes,
  GetUserInformation,
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
  const isDraftsVisible = isSignedIn && user.userId === userId;

  const [tabIndex, setTabIndex] = React.useState(
    isDraftsVisible && tabParam === "drafts" ? "1" : "0",
  );

  const effectiveTabIndex = isDraftsVisible ? tabIndex : "0";

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [requestedUser, setRequestedUser] = useState<UserSummary | undefined>(
    undefined,
  );
  const [requestedUserLoaded, setRequestedUserLoaded] = useState(false);
  const [publishedJokes, setPublishedJokes] = useState<JokeSummary[]>([]);
  const [publishedLoaded, setPublishedLoaded] = useState(false);
  const [draftJokes, setDraftJokes] = useState<JokeSummary[]>([]);
  const [draftLoaded, setDraftLoaded] = useState(false);

  const handleTabChange = (
    event: React.SyntheticEvent,
    newTabIndex: string,
  ) => {
    setTabIndex(newTabIndex);

    if (newTabIndex === "0") {
      setPublishedLoaded(false);
    }
  };

  useEffect(() => {
    if (!isDraftsVisible && tabIndex != "0") {
      setTabIndex("0");
    }
  }, [isDraftsVisible, tabIndex]);

  useEffect(() => {
    async function loadUser() {
      try {
        if (isSignedIn && user.userId === userId) {
          setRequestedUser(user);
          setRequestedUserLoaded(true);
          return;
        }

        const requestedUser = await GetUserInformation(userId);
        setRequestedUser(requestedUser);
        setRequestedUserLoaded(true);
      } catch (err) {
        setRequestedUserLoaded(true);
        setErrorMsg("Load error: " + (err as Error).message);
        setOpenSnackbar(true);
      }
    }

    loadUser();
  }, [isSignedIn, user, userId]);

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

    if (tabIndex === "0" && !publishedLoaded) {
      loadPublished();
    }

    if (tabIndex === "1" && isDraftsVisible && !draftLoaded) {
      loadDrafts();
    }
  }, [tabIndex, userId, isDraftsVisible, publishedLoaded, draftLoaded]);

  if (requestedUserLoaded && !requestedUser) {
    return (
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
    );
  }

  return (
    <Box sx={{ width: "75%", typography: "body1", mx: "auto", mt: 2 }}>
      <Stack spacing={2}>
        {requestedUserLoaded ? (
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            sx={{ mt: 2, fontWeight: 500 }}
          >
            {requestedUser?.userName}
          </Typography>
        ) : (
          <Skeleton
            variant="rectangular"
            width={250}
            height={40}
            sx={{ mx: "auto", mt: 2, borderRadius: 2 }}
          />
        )}
        <TabContext value={effectiveTabIndex}>
          <Box sx={{ borderBottom: 2, borderColor: "divider" }}>
            <TabList onChange={handleTabChange}>
              <Tab label="Published Jokes" value="0" />
              {isDraftsVisible ? <Tab label="Drafts" value="1" /> : null}
            </TabList>
          </Box>
          <TabPanel value="0">
            {!publishedLoaded ? (
              <Stack spacing={2}>
                {Array.from(new Array(3)).map((_, index) => (
                  <Skeleton
                    key={index}
                    variant="rectangular"
                    height={120}
                    animation="wave"
                    sx={{
                      borderRadius: 2,
                      bgcolor: "jokeCard.blue",
                    }}
                  />
                ))}
              </Stack>
            ) : publishedJokes.length > 0 ? (
              <section className={styles.jokelist}>
                {publishedJokes.map((joke) => (
                  <JokeCard
                    key={joke.jokeId}
                    joke={joke}
                    statisticsHref={`/joke/${joke.jokeId}`}
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
          {isDraftsVisible ? (
            <TabPanel value="1">
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
