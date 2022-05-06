/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    points: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    points?: React.CSSProperties;
  }
}
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    points: true;
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: '#6200EE',
    },
    secondary: {
      main: '#BB86FC',
    },
    success: {
      main: '#86FCC1',
    },
    error: {
      main: '#FF0067',
    },
    grey: {
      '400': '#A1A0AE',
    },
    background: {
      default: '#F0F0F7',
      paper: '#FFF',
    },
  },
  typography: {
    h6: {
      fontWeight: 'bold',
      color: '#172031',
    },
    body1: {
      fontWeight: 'normal',
      fontSize: '0.9375rem',
      lineHeight: '1.25rem',
      color: '#A1A0AE',
    },
    overline: {
      fontWeight: '300',
      fontSize: '0.9375rem',
      lineHeight: '1.25rem',
      color: '#A1A0AE',
      textTransform: 'none',
    },
    points: {
      fontSize: '1.5625rem',
      lineHeight: '1.875rem',
      fontWeight: 'bold',
      color: '#4D4F5C',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        elevation1: {
          boxShadow: '0px 2px 6px #0000000A',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});
