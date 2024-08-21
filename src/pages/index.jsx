import React from "react";
import { Route, Routes } from "react-router-dom";
import Administrators from "./Administators";

import Auth from "./Auth";

import Dashboard from "./Dashboard";
import AdminDetail from "./Administators/AdminDetail";
import { Box } from "@mui/material";
import { SuperadminSidebar } from "../components/Navigation";
import CompaniesList from "./Companies";
import PrivateRoute from "./PrivateRoute"; // Import PrivateRoute
import { useSelector } from "react-redux";
import CompanyDetail from "./Companies/CompanyDetail";

const Pages = () => {
  // Change to `false` to simulate a user not logged in
  // const userRole = "superadmin"; // Possible values: 'admin', 'superadmin'
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userRole = useSelector((state) => state.auth.userRole);

  console.log(isAuthenticated);
  console.log(userRole);

  return (
    <>
      {/* Conditional Sidebar Rendering */}
      {isAuthenticated && userRole === "Superadmin" && (
        // <div>Superadmin Sidebar</div> // Replace with actual Sidebar component for Superadmin
        <SuperadminSidebar />
      )}

      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Auth />} />

        <Route
          path="/"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              {/* <Container sx={{ width: '100%', p: 0 }}> */}
              <Box sx={{ my: 4, width: "100%", mx: "2rem" }}>
                <Dashboard />
              </Box>
            </PrivateRoute>
          }
        />
        <Route
          path="/administrators"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Box sx={{ my: 4, width: "100%", mx: "2rem" }}>
                <Administrators />
              </Box>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin-detail/:idAdmin"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Box sx={{ my: 4, width: "100%", mx: "2rem" }}>
                <AdminDetail />
              </Box>
            </PrivateRoute>
          }
        />
        <Route
          path="/companies"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Box sx={{ my: 4, width: "100%", mx: "2rem" }}>
                <CompaniesList />
              </Box>
            </PrivateRoute>
          }
        />
        <Route
          path="/company-detail/:idCompany"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Box sx={{ my: 4, width: "100%", mx: "2rem" }}>
                <CompanyDetail />
              </Box>
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default Pages;
