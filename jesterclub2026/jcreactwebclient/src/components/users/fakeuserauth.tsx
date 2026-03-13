"use client";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { ManageAccounts } from "@mui/icons-material";

import { useCurrentUserContext } from "@/lib/fakeuserauth/fakeauthcontext";

export default function UserMenu() {
  const { users, setUser } = useCurrentUserContext()!;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const selectUser = (id: number) => {
    setUser(id);
    handleClose();
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleOpen}>
        <ManageAccounts />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {users.map((u) => (
          <MenuItem key={u.id} onClick={() => selectUser(u.id)}>
            {u.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
