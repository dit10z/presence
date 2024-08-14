import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  typography: {
    fontFamily: ['"Lexend"', '"Mulish"', 'Arial', 'sans-serif'].join(','),
  },
  palette: {
    primary: {
      main: '#0078D7',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
