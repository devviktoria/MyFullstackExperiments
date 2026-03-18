'use client';
import { createTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

declare module "@mui/material/styles" {

  interface Palette {
    jokeCard: {
      yellow: string;
      red: string;
      blue: string;
    };

    jokeEmotionPieChart: {
      sleepy: string;
      none: string;
      happy: string;
      lol: string;
      lshic: string;
    };
  }

  interface PaletteOptions {
    jokeCard?: {
      yellow?: string;
      red?: string;
      blue?: string;
    };
    jokeEmotionPieChart: {
      sleepy?: string;
      none?: string;
      happy?: string;
      lol?: string;
      lshic?: string;
    };
  }

}

const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#d7e8cd',
        },
        background: {
          default: '#f8fbf1',
          paper: '#f8fbf1'
        },
        jokeCard: {
          yellow: '#FFFFE0',
          red: '#FFF0F5',
          blue: '#F0FFFF'
        },
        jokeEmotionPieChart: {
          sleepy: "#9FA8DA",
          none: "#CE93D8",
          happy: "#EF9A9A",
          lol: "#FFAB91",
          lshic: "#FFCC80",
        }
      }
    },
    dark: {
      palette: {
        primary: {
          main: '#3c4b37',
        },
        background: {
          default: '#11140f',
          paper: '#11140f'
        },
        jokeCard: {
          yellow: '#D2691E',
          red: '#8B0000',
          blue: '#483D8B',
        },
        jokeEmotionPieChart: {
          sleepy: "#1A237E",
          none: "#4A148C",
          happy: "#B71C1C",
          lol: "#BF360C",
          lshic: "#E65100",
        }
      }
    }
  },
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: {
          variants: [
            {
              props: { severity: 'info' },
              style: {
                backgroundColor: '#60a5fa',
              },
            },
          ],
        },
      },
    },
  },
});

export default theme;
