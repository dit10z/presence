import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import {
  Avatar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  Menu,
  MenuItem,
  AppBar as MuiAppBar,
  Stack,
  styled,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavItem from './NavItem';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const SuperAdminSidebar = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = true;

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Logic for logout
    router.push('/login');
  };

  const isMenuOpen = Boolean(anchorEl);

  const listMenu = [
    { title: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    {
      title: 'All Administrators',
      icon: <PeopleAltIcon />,
      path: '/all-administrators',
    },
    { title: 'All Companies', icon: <PeopleAltIcon />, path: '/all-companies' },
  ];

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }));

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} elevation={0}>
        <Toolbar
          sx={{
            backgroundColor: 'white',
            boxShadow: 'none',
            borderBottom: '1px solid #E5E5E5',
            color: 'black',
            justifyContent: 'space-between',
          }}
        >
          <Stack>
            <Typography variant="h6" fontWeight="bold" noWrap>
              Hello Robert👋🏻
            </Typography>
            <Typography variant="body2" color={`${theme.palette.grey[400]}`}>
              Good Morning! Now it's Thursday, May 20th 2020.
            </Typography>
          </Stack>
          <Box border={`1px ${theme.palette.grey[300]} solid`} borderRadius="0.5rem" padding="0.125rem">
            <Stack direction="row" alignItems="center" spacing={2}>
              <IconButton sx={{ p: 0 }}>
                <Avatar alt="Robert Allen" src="/mock/dummy_avatar.png" variant="rounded" />
              </IconButton>
              <Stack>
                <Typography variant="body2" sx={{ display: 'inline' }}>
                  Robert Allen
                </Typography>
                <Typography variant="body2" sx={{ display: 'inline' }} color={`${theme.palette.grey[400]}`}>
                  SuperAdmin
                </Typography>
              </Stack>
              <IconButton onClick={handleMenuClick} sx={{ p: 0 }}>
                {isMenuOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Stack>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <DrawerHeader>
          <Stack direction="row" alignItems="center" marginX="auto" marginTop="2rem">
            <img src="/Logo/logo-79.png" alt="Logo padepokan 79" width="170px" />
          </Stack>
        </DrawerHeader>
        <List sx={{ padding: '1rem' }}>
          {listMenu.map((item, index) => (
            <NavItem key={index} title={item.title} icon={item.icon} />
          ))}
        </List>
        <Box sx={{ flexGrow: 1 }} />
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: `${drawerWidth}px`,
          width: `calc(100% - ${drawerWidth}px)`,
          mt: 8,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default SuperAdminSidebar;
