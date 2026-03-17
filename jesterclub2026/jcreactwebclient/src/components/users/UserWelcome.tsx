"use client";
import Typography from "@mui/material/Typography";
import { useCurrentUserContext } from "@/lib/fakeuserauth/fakeauthcontext";

export default function UserWelcome() {
  const { user, isSignedIn } = useCurrentUserContext();

  return isSignedIn ? (
    <Typography variant="h6">Welcome {user.userName}!</Typography>
  ) : (
    <Typography variant="h6">Welcome!</Typography>
  );
}
