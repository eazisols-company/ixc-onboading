'use client';

import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2164ef',      // azure-radiance-600
      light: '#5da7fd',     // azure-radiance-400
      dark: '#1a4edb',      // azure-radiance-700
    },
    grey: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#E9EAEB',
      300: '#D5D7DA',
      400: '#A4A7AE',
      500: '#717680',
      600: '#535862',
      700: '#414651',
      800: '#252B37',
      900: '#181D27',
    },
    background: {
      default: '#F5F5F5',   // grey-100
      paper: '#ffffff',
    },
    text: {
      primary: '#181D27',    // grey-900
      secondary: '#535862',  // grey-600
      disabled: '#A4A7AE',   // grey-400
    },
  },
  typography: {
    fontFamily: '"Mona Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    // Display styles
    h1: {
      fontFamily: '"Mona Sans", sans-serif',
      fontSize: '4.5rem',      // Display 2xl - 72px
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      fontWeight: 400,
    },
    h2: {
      fontFamily: '"Mona Sans", sans-serif',
      fontSize: '3.75rem',     // Display xl - 60px
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      fontWeight: 400,
    },
    h3: {
      fontFamily: '"Mona Sans", sans-serif',
      fontSize: '3rem',        // Display lg - 48px
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      fontWeight: 400,
    },
    h4: {
      fontFamily: '"Mona Sans", sans-serif',
      fontSize: '2.25rem',     // Display md - 36px
      lineHeight: 1.22,
      letterSpacing: '-0.02em',
      fontWeight: 400,
    },
    h5: {
      fontFamily: '"Mona Sans", sans-serif',
      fontSize: '1.875rem',    // Display sm - 30px
      lineHeight: 1.27,
      letterSpacing: '-0.02em',
      fontWeight: 400,
    },
    h6: {
      fontFamily: '"Mona Sans", sans-serif',
      fontSize: '1.5rem',      // Display xs - 24px
      lineHeight: 1.33,
      fontWeight: 400,
    },
    // Text styles
    body1: {
      fontFamily: '"Mona Sans", sans-serif',
      fontSize: '1rem',        // Text md - 16px
      lineHeight: 1.5,
      fontWeight: 400,
    },
    body2: {
      fontFamily: '"Mona Sans", sans-serif',
      fontSize: '0.875rem',    // Text sm - 14px
      lineHeight: 1.43,
      fontWeight: 400,
    },
    subtitle1: {
      fontFamily: '"Mona Sans", sans-serif',
      fontSize: '1.125rem',    // Text lg - 18px
      lineHeight: 1.56,
      fontWeight: 400,
    },
    subtitle2: {
      fontFamily: '"Mona Sans", sans-serif',
      fontSize: '0.75rem',     // Text xs - 12px
      lineHeight: 1.67,
      fontWeight: 400,
    },
    button: {
      fontFamily: '"Mona Sans", sans-serif',
      fontSize: '1rem',
      lineHeight: 1.5,
      fontWeight: 500,
      textTransform: 'none',
    },
    caption: {
      fontFamily: '"Mona Sans", sans-serif',
      fontSize: '0.75rem',     // Text xs - 12px
      lineHeight: 1.67,
      fontWeight: 400,
    },
    overline: {
      fontFamily: '"Mona Sans", sans-serif',
      fontSize: '0.75rem',
      lineHeight: 1.67,
      fontWeight: 500,
      textTransform: 'uppercase',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 500,
          minHeight: 44, // Minimum touch target size for mobile
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-input': {
            padding: '14px', // Better touch target
          },
        },
      },
    },
  },
});

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}

