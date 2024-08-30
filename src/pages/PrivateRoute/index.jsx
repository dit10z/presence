import React from "react";
import { Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import { SuperadminSidebar } from "../../components/Navigation";

const PrivateRoute = ({ children, isAuthenticated, userRole }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      {userRole === "Superadmin" && <SuperadminSidebar />}
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          width: `calc(100% - 240px)`, // Adjust width when sidebar is present
          ml: "240px", // Margin left for the sidebar
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default PrivateRoute;
