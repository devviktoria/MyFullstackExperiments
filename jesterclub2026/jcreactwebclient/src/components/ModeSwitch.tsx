"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";

import Brightness6 from "@mui/icons-material/Brightness6";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import ContrastIcon from "@mui/icons-material/Contrast";

import { useColorScheme } from "@mui/material/styles";

export default function ModeSwitch() {
  const { mode, setMode } = useColorScheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  if (!mode) {
    return null;
  }

  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const selectMode = (mode: "light" | "dark" | "system") => {
    setMode(mode);
    handleClose();
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        mt: 1,
        p: 1,
      }}
    >
      <IconButton color="inherit" onClick={handleOpen}>
        <Brightness6 />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={() => selectMode("system")}>
          <ListItemIcon>
            <ContrastIcon fontSize="small" />
          </ListItemIcon>
          From OS
        </MenuItem>

        <MenuItem onClick={() => selectMode("light")}>
          <ListItemIcon>
            <LightModeIcon fontSize="small" />
          </ListItemIcon>
          Light mode
        </MenuItem>

        <MenuItem onClick={() => selectMode("dark")}>
          <ListItemIcon>
            <DarkModeIcon fontSize="small" />
          </ListItemIcon>
          Dark mode
        </MenuItem>
      </Menu>
    </Box>
  );
}
