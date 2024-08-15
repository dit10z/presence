import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  typography: {
    fontFamily: ['"Lexend"', '"Mulish"', "Arial", "sans-serif"].join(","),
    button: {
      textTransform: "none",
    },
  },
  palette: {
    primary: {
      main: "#0078D7",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    button: {
      main: "#0078D7",
      contrastText: "#fff",
    },
  },
});

export default theme;
