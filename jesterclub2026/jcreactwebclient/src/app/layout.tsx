import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/material/Link";

import theme from "@/theme/theme";
import ModeSwitch from "@/components/ModeSwitch";
import "./globals.css";
import { CurrentUserProvider } from "../lib/fakeuserauth/fakeauthcontext";
import UserWelcome from "@/components/users/UserWelcome";
import UserMenu from "@/components/users/FakeUserAuth";
import UserPostJoke from "@/components/users/UserPostJoke";

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
      <head></head>
      <body>
        <InitColorSchemeScript attribute="class" />
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <CurrentUserProvider>
              <header>
                <AppBar position="static" color="primary" enableColorOnDark>
                  <Toolbar>
                    <Link
                      href="#"
                      underline="none"
                      color="inherit"
                      sx={{ mr: 2 }}
                    >
                      Jester Club 2026
                    </Link>
                    <UserWelcome />
                    <span className="spacer"></span>
                    <UserPostJoke />
                    <UserMenu />
                    <ModeSwitch />
                  </Toolbar>
                </AppBar>
              </header>
              {children}
            </CurrentUserProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
