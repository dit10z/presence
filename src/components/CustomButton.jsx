import { Button, CircularProgress, Stack } from "@mui/material";
import React from "react";

const CustomButton = ({
  children,
  onClick,
  variant = "contained",
  color = "button",
  size = "medium",
  startIcon,
  endIcon,
  loading = false,
  disabled = false,
  ...rest
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      startIcon={!loading && startIcon}
      endIcon={!loading && endIcon}
      onClick={onClick}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <Stack direction="row" alignItems="center">
          <CircularProgress size={20} color="inherit" />
        </Stack>
      ) : (
        children
      )}
    </Button>
  );
};

export default CustomButton;
