"use client";
import Link from "next/link";
import Fab from "@mui/material/Fab";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { useCurrentUserContext } from "@/lib/fakeuserauth/fakeauthcontext";

export default function UserWelcome() {
  const { isSignedIn } = useCurrentUserContext()!;

  return isSignedIn ? (
    <Link href="/jokeupsert">
      <Fab variant="extended">
        <PostAddIcon sx={{ mr: 1 }} />
        Post
      </Fab>
    </Link>
  ) : null;
}
