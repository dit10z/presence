import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Administrators from './Administators';

import Auth from './Auth';

import Dashboard from './Dashboard';

import { SuperadminSidebar } from '../components/Navigation';
import CompaniesList from './Companies';
import PrivateRoute from './PrivateRoute'; // Import PrivateRoute

const Pages = () => {
  // Dummy variables for authentication and role
  const isAuthenticated = true; // Change to `false` to simulate a user not logged in
  const userRole = 'superadmin'; // Possible values: 'admin', 'superadmin'

  return (
    <>
      {/* Conditional Sidebar Rendering */}
      {isAuthenticated && userRole === 'superadmin' && (
        // <div>Superadmin Sidebar</div> // Replace with actual Sidebar component for Superadmin
        <SuperadminSidebar />
      )}

      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Auth />} />

        {/* Private Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/administrators"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Administrators />
            </PrivateRoute>
          }
        />
        <Route
          path="/companies"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <CompaniesList />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default Pages;
