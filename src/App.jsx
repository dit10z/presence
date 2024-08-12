import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Pages from './pages'; 
import ProTip from './components/ProTip';
import Copyright from './components/Copyright';

export default function App() {
  return (
    <Router>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Pages /> {/* Ini akan mengatur semua routing dan halaman */}
          <ProTip />
          <Copyright />
        </Box>
      </Container>
    </Router>
  );
}
