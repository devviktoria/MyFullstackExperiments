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
            <header>
              <AppBar position="static" color="primary" enableColorOnDark>
                <Toolbar>
                  <Link href="#" underline="none" color="inherit">
                    Jester Club 2026
                  </Link>
                  <span className="spacer"></span>
                  <ModeSwitch />
                </Toolbar>
              </AppBar>
            </header>
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
