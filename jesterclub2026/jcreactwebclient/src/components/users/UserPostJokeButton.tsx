"use client";
import Link from "next/link";
import Fab from "@mui/material/Fab";
import Icon from "@mui/material/Icon";
import { useCurrentUserContext } from "@/lib/fakeuserauth/fakeauthcontext";

export default function UserPostJokeButton() {
  const { isSignedIn } = useCurrentUserContext()!;

  return isSignedIn ? (
    <Link href="/jokeupsert">
      <Fab variant="extended">
        <Icon className="material-symbols-outlined" sx={{ mr: 1 }}>
          sticker_add
        </Icon>
        Post
      </Fab>
    </Link>
  ) : null;
}
