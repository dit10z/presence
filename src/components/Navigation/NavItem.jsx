import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';

const NavItem = ({ title, icon, onClick, selected }) => {
  return (
    <ListItem disablePadding>
      <ListItemButton
        onClick={onClick}
        sx={{
          minHeight: 48,
          justifyContent: 'initial',
          px: 2.5,
          color: selected ? 'white' : '#586A84',
          borderRadius: '0.5rem',
          backgroundColor: selected ? '#0078D7' : 'inherit',
          '&:hover': {
            backgroundColor: 'rgba(0, 120, 215, 0.5)',
            color: 'white',
          },
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: 1.5,
            justifyContent: 'center',
            color: selected ? 'white' : '#586A84',
          }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText primary={title} sx={{ color: selected ? '#0078D7' : 'black' }} />
      </ListItemButton>
    </ListItem>
  );
};

export default NavItem;
