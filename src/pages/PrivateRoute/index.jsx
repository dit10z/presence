import React from "react";
import { Navigate } from "react-router-dom";
import { Box } from "@mui/material";

const PrivateRoute = ({ children, isAuthenticated }) => {
  return isAuthenticated ? (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        width: `calc(100% - 240px)`,
        ml: "240px",
      }}
    >
      {children}
    </Box>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
