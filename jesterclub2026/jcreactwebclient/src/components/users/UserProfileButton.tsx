"use client";
import Link from "next/link";
import Fab from "@mui/material/Fab";
import Icon from "@mui/material/Icon";
import { useCurrentUserContext } from "@/lib/fakeuserauth/fakeauthcontext";

export default function UserProfileButton() {
  const { user, isSignedIn } = useCurrentUserContext()!;

  return isSignedIn ? (
    <Link href={`/${user.userId}`}>
      <Fab variant="extended" sx={{ mr: 1 }}>
        <Icon className="material-symbols-outlined" sx={{ mr: 1 }}>
          sticker
        </Icon>
        My Profile
      </Fab>
    </Link>
  ) : null;
}
