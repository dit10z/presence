import React from "react";
import { Routes, Route } from "react-router-dom";
import Administrators from "./Administators";
import AllAdministrator from "./Dashboard/AllAdministrator";
import Auth from "./Auth";
import Companies from "./Companies";
import Dashboard from "./Dashboard";
import PrivateRoute from "./PrivateRoute"; // Import PrivateRoute
import { SuperadminSidebar } from "../components/Navigation";

const Pages = () => {
  // Dummy variables for authentication and role
  const isAuthenticated = true; // Change to `false` to simulate a user not logged in
  const userRole = "superadmin"; // Possible values: 'admin', 'superadmin'

  return (
    <>
      {/* Conditional Sidebar Rendering */}
      {isAuthenticated && userRole === "superadmin" && (
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
              <Companies />
            </PrivateRoute>
          }
        />
        <Route path="all-admministrator" element={<AllAdministrator />} />
      </Routes>
    </>
  );
};

export default Pages;
