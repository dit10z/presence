import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Pages from "./pages";

export default function App() {
  return (
    <Router>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Pages /> {/* Ini akan mengatur semua routing dan halaman */}
          {/* <ProTip /> */}
          {/* <Copyright /> */}
        </Box>
      </Container>
    </Router>
  );
}
