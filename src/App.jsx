import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Pages from './pages';

export default function App() {
  return (
    <Router>
      <Pages /> {/* Ini akan mengatur semua routing dan halaman */}
      {/* <ProTip /> */}
      {/* <Copyright /> */}
    </Router>
  );
}
