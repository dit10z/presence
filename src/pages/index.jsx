import React from "react";
import { Routes, Route } from "react-router-dom";
import Administrators from "./Administators";
// import Attendances from "./Attendances";
import Auth from "./Auth";
import Companies from "./Companies";
import Dashboard from "./Dashboard";
// import Departments from "./Departments";
// import Employees from "./Employees";
// import Holidays from "./Holidays";
// import Leaves from "./Leaves";
import Settings from "./Settings";
import PrivateRoute from "./PrivateRoute"; // Import PrivateRoute
import { AdminSidebar, SuperadminSidebar } from "../components/Navigation";

const Pages = () => {
  // Dummy variables for authentication and role
  const isAuthenticated = false; // Change to `false` to simulate a user not logged in
  const userRole = "admin"; // Possible values: 'admin', 'superadmin'

  return (
    <>
      {/* Conditional Sidebar Rendering */}
      {isAuthenticated && userRole === "superadmin" && (
        // <div>Superadmin Sidebar</div> // Replace with actual Sidebar component for Superadmin
        <SuperadminSidebar />
      )}
      {isAuthenticated && userRole === "admin" && (
        // <div>Admin Sidebar</div> // Replace with actual Sidebar component for Admin
        <AdminSidebar />
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
          path="/attendances"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Attendances />
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
        <Route
          path="/departments/*"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Departments />
            </PrivateRoute>
          }
        />
        <Route
          path="/employees/*"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Employees />
            </PrivateRoute>
          }
        />
        <Route
          path="/holidays"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Holidays />
            </PrivateRoute>
          }
        />
        <Route
          path="/leaves"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Leaves />
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Settings />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default Pages;
