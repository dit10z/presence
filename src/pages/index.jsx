<<<<<<< HEAD
import React from "react";
import { Route, Routes } from "react-router-dom";
import Administrators from "./Administators";
import Auth from "./Auth";

import Dashboard from "./Dashboard";

import { Box, Container } from "@mui/material";
import { SuperadminSidebar } from "../components/Navigation";
import CompaniesList from "./Companies";
import PrivateRoute from "./PrivateRoute"; // Import PrivateRoute
=======
import { Box } from '@mui/material';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { SuperadminSidebar } from '../components/Navigation';
import Administrators from './Administators';
import Auth from './Auth';
import CompaniesList from './Companies';
import Dashboard from './Dashboard';
import PrivateRoute from './PrivateRoute'; // Import PrivateRoute
>>>>>>> fed7c019848aa5078e8a9a5be0cf67b7830d6e85

const Pages = () => {
  const isAuthenticated = true; // Change to `false` to simulate a user not logged in
  const userRole = "superadmin"; // Possible values: 'admin', 'superadmin'

  return (
    <>
      {isAuthenticated && userRole === 'superadmin' && <SuperadminSidebar />}

      <Box sx={{ display: 'flex', flexGrow: 1, width: `calc(100% - 240px)`, ml: '240px' }}>
        <Routes>
          <Route path="/login" element={<Auth />} />

          <Route
            path="/"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                {/* <Container sx={{ width: '100%', p: 0 }}> */}
                <Box sx={{ my: 4, width: '100%', mx: '2rem' }}>
                  <Dashboard />
                </Box>
              </PrivateRoute>
            }
          />
          <Route
            path="/administrators"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Box sx={{ my: 4, width: '100%', mx: '2rem' }}>
                  <Administrators />
                </Box>
              </PrivateRoute>
            }
          />
          <Route
            path="/companies"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Box sx={{ my: 4, width: '100%', mx: '2rem' }}>
                  <CompaniesList />
                </Box>
              </PrivateRoute>
            }
          />
        </Routes>
      </Box>
    </>
  );
};

export default Pages;
