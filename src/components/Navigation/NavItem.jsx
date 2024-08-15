import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import theme from "../../styles/theme";

const NavItem = ({ title, icon, onClick, selected }) => {
  return (
    <ListItem disablePadding>
      <ListItemButton
        onClick={onClick}
        sx={{
          minHeight: 48,
          justifyContent: "initial",
          px: 2.5,
          color: selected ? "white" : "#586A84",
          backgroundColor: selected ? "rgba(0, 120, 215, 0.2)" : "inherit",
          borderWidth: "10px",
          borderLeft: selected ? "4px solid" : "",
          borderRadius: "0.2rem",
          borderLeftColor: selected
            ? `${theme.palette.primary.main}`
            : "inherit",
          "&:hover": {
            backgroundColor: "rgba(0, 120, 215, 0.2)",
          },
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: 1.5,
            justifyContent: "center",
            color: selected ? `${theme.palette.primary.main}` : "inherit",
          }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText
          primary={title}
          sx={{ color: selected ? `${theme.palette.primary.main}` : "black" }}
          primaryTypographyProps={{
            fontSize: "0.860rem",
            fontWeight: selected ? "700" : "400",
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default NavItem;
