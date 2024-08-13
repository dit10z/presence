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

const drawerWidth = 240;
// const collapsedDrawerWidth = 60;

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
          style={{
            backgroundColor: 'white',
            boxShadow: 'none',
            borderBottom: '1px solid #E5E5E5',
            color: 'black',
          }}
        >
          <Typography variant="h6" fontWeight="bold" noWrap sx={{ flexGrow: 1 }}>
            Hello Robert👋🏻
          </Typography>
          <Box>
            <IconButton onClick={handleMenuClick} sx={{ p: 0 }}>
              <Avatar alt="Robert Allen" src="/mock/dummy_avatar.png" variant="rounded" />
            </IconButton>
            <Typography variant="body2" sx={{ display: 'inline', ml: 1 }}>
              Robert Allen
            </Typography>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
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
            <NavItem
              key={index}
              title={item.title}
              icon={item.icon}
              // selected={router.pathname === item.path}
              // onClick={() => router.push(item.path)}
            />
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
