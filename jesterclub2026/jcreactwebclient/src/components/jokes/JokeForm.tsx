"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Autocomplete from "@mui/material/Autocomplete";

import { useCurrentUserContext } from "@/lib/fakeuserauth/fakeauthcontext";
import { JokeUpsertModel } from "@/interfaces/jokeupsertmodel.data";
import { useEffect, useState } from "react";
import {
  CreateJoke,
  GetJokeUpsertData,
  GetNewJokeUpsertData,
  UpdateJoke,
} from "@/lib/jokeeditor/jokeeditor.service";

interface JokeFormProps {
  jokeId?: string;
}

export default function JokeForm({ jokeId }: JokeFormProps) {
  const params = useSearchParams();
  const returnTo = params.get("returnTo");

  const isEditMode = !!jokeId;

  const [joke, setJoke] = useState<JokeUpsertModel>();
  const [loading, setLoading] = useState(true);
  const { user, isSignedIn } = useCurrentUserContext();

  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [textTouched, setTextTouched] = useState(false);
  const [sourceTouched, setSourceTouched] = useState(false);
  const [tagsTouched, setTagsTouched] = useState(false);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function load() {
      try {
        const joke = isEditMode
          ? await GetJokeUpsertData(Number(jokeId))
          : await GetNewJokeUpsertData(user.id);
        setJoke(joke);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (isSignedIn) {
      load();
    }
  }, [jokeId, isSignedIn]);

  useEffect(() => {
    if (!joke) return;

    setText(joke.text ?? "");
    setSource(joke.source ?? "");
    setTags(joke.tags ?? []);
  }, [joke]);

  if (!isSignedIn) {
    return (
      <Typography variant="body1" gutterBottom align="center" sx={{ mt: 2 }}>
        Please login to post a new joke! -{jokeId}-
      </Typography>
    );
  }
  if (loading) return <CircularProgress />;

  const textError =
    text.length === 0
      ? "The joke is required."
      : text.length < 10
        ? "The joke must be at least 10 characters long."
        : "";

  const sourceError =
    source.length > 0 && source.length < 5
      ? "The source must be at least 5 characters long."
      : "";

  const tagsError =
    tags.length === 0
      ? "You must specify at least one tag."
      : tags.length > 5
        ? "You can specify at most five tags."
        : "";

  const formValid = !textError && !sourceError && !tagsError;

  function addTag() {
    const tag = newTag.trim().toLowerCase();

    if (!tag) return;
    if (tags.includes(tag)) return;
    if (tags.length >= 5) return;

    setTags([...tags, tag]);
    setNewTag("");
  }

  function deleteTag(tag: string) {
    setTags(tags.filter((t) => t !== tag));
  }

  async function submit(mode: "draft" | "publish") {
    if (!joke || !formValid) return;

    const updatedJoke: JokeUpsertModel = {
      ...joke,
      text,
      source,
      tags,
      createdDate: new Date(),
      releasedDate: mode === "publish" ? new Date() : null,
    };

    try {
      if (isEditMode) {
        await UpdateJoke(updatedJoke);
      } else {
        await CreateJoke(updatedJoke);
      }
    } catch (err) {
      setOpenSnackbar(true);
      setErrorMsg("Save error!" + err);
    }

    if (mode === "draft") {
      router.push(`/${user.id}?tab=drafts`);
    } else if (
      mode === "publish" &&
      (returnTo === "drafts" || returnTo === "published")
    ) {
      router.push(`/${user.id}?tab=published`);
    } else {
      router.push("/");
    }
  }

  function handleCancel() {
    if (returnTo === "drafts") {
      router.push(`/${user.id}?tab=drafts`);
    } else if (returnTo === "published") {
      router.push(`/${user.id}?tab=published`);
    } else {
      router.push("/");
    }
  }

  return (
    <>
      <form id="jokeForm">
        <Card raised={true}>
          <CardContent>
            <TextField
              id="joke_text"
              label="Joke"
              placeholder="Write the joke here ..."
              multiline
              variant="filled"
              required
              fullWidth
              margin="normal"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onBlur={() => setTextTouched(true)}
              error={textTouched && !!textError}
              helperText={textTouched ? textError : ""}
            />
            <TextField
              id="joke_source"
              label="Source"
              variant="filled"
              fullWidth
              margin="normal"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              onBlur={() => setSourceTouched(true)}
              error={sourceTouched && !!sourceError}
              helperText={sourceTouched ? sourceError : ""}
            />
            <Autocomplete
              multiple
              freeSolo
              options={[]}
              value={tags}
              onChange={(event, newValue) => {
                setTags(newValue.slice(0, 5));
              }}
              renderValue={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    label={option}
                    {...getTagProps({ index })}
                    key={option}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="filled"
                  label="Tags"
                  placeholder="Add tag..."
                  error={tagsTouched && !!tagsError}
                  helperText={tagsTouched ? tagsError : ""}
                  onBlur={() => setTagsTouched(true)}
                />
              )}
            />
          </CardContent>
          <CardActions>
            <Button variant="contained" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              type="button"
              variant="contained"
              disabled={!formValid}
              onClick={() => submit("draft")}
            >
              Save As Draft
            </Button>
            <Button
              type="button"
              variant="contained"
              disabled={!formValid}
              onClick={() => submit("publish")}
            >
              Publish
            </Button>
          </CardActions>
        </Card>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        message={errorMsg}
        onClose={() => setOpenSnackbar(false)}
      />
    </>
  );
}
