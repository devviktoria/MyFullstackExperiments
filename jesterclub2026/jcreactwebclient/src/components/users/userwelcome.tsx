"use client";
import Typography from "@mui/material/Typography";
import { useCurrentUserContext } from "@/lib/fakeuserauth/fakeauthcontext";

export default function UserWelcome() {
  const { user, users, isSignedIn } = useCurrentUserContext()!;

  return isSignedIn ? (
    <Typography variant="h6">Welcome {user.name}!</Typography>
  ) : (
    <Typography variant="h6">Welcome!</Typography>
  );
}
