import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import theme from "@/theme/theme";
import ModeSwitch from "@/components/ModeSwitch";
import "./globals.css";
import { CurrentUserProvider } from "../lib/fakeuserauth/fakeauthcontext";
import UserWelcome from "@/components/users/UserWelcome";
import UserMenu from "@/components/users/FakeUserAuth";
import UserPostJoke from "@/components/users/UserPostJokeButton";
import UserProfileButton from "@/components/users/UserProfileButton";

export const metadata: Metadata = {
  title: "Jester Club 2026",
  description: "A social website about jokes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
      </head>
      <body>
        <CurrentUserProvider>
          <InitColorSchemeScript attribute="class" />
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ThemeProvider theme={theme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <header>
                <AppBar position="static" color="primary" enableColorOnDark>
                  <Toolbar>
                    <Link
                      href="/"
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                      }}
                    >
                      <Typography
                        variant="h5"
                        sx={{ fontWeight: "bold", mr: 2 }}
                      >
                        Jester Club 2026
                      </Typography>
                    </Link>
                    <UserWelcome />
                    <span className="spacer"></span>
                    <UserProfileButton />
                    <UserPostJoke />
                    <UserMenu />
                    <ModeSwitch />
                  </Toolbar>
                </AppBar>
              </header>
              {children}
            </ThemeProvider>
          </AppRouterCacheProvider>
        </CurrentUserProvider>
      </body>
    </html>
  );
}
