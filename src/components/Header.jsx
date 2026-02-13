import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery
} from '@mui/material';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import CreateIcon from '@mui/icons-material/Create';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { userNotExists } from '../redux/reducers/auth';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:768px)');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const logoutHandler = async () => {
    try {
    const { data } = await axios.get(
      "https://blogify-backend-1-porw.onrender.com/user/logout", 
      { withCredentials: true }
    );
    
    if (data.success) {
      dispatch(userNotExists());
      toast.success("Logged out successfully");
      navigate("/login", { replace: true }); 
    }
  } catch (error) {
    toast.error("Logout failed");
  }
  };

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, action: () => navigate('/') },
    { text: 'About', icon: <InfoIcon />, action: () => navigate('/about') },
    { text: 'Write Blog', icon: <CreateIcon />, action: () => navigate('/create') },
    { text: 'Profile', icon: <AccountCircleIcon />, action: () => navigate('/profile') },
    { text: 'Logout', icon: <LogoutIcon />, action: logoutHandler },
  ];

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: 'white', boxShadow: 1 }}>
        <Toolbar>
          <Box display="flex" alignItems="center" flexGrow={1} gap={2} ml={2}>
            <AutoStoriesIcon fontSize="large" sx={{ color: 'black' }} />
            <Typography
              variant="h5"
              sx={{ fontFamily: 'cursive', fontWeight: 600, color: 'black' }}
            >
              Blogify
            </Typography>
          </Box>

          {isMobile ? (
            <>
              <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: 'black' }}>
                <MenuIcon />
              </IconButton>
              <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <List sx={{ width: 250 }}>
                  {menuItems.map((item, index) => (
                    <ListItem key={index} disablePadding>
                      <ListItemButton
                        onClick={() => {
                          item.action();
                          setDrawerOpen(false);
                        }}
                      >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Drawer>
            </>
          ) : (
            <Box display="flex" alignItems="center" gap={3} mr={5}>
              {menuItems.map((item, index) => (
                <IconButton
                  key={index}
                  sx={{ color: 'black' }}
                  title={item.text}
                  onClick={item.action}
                >
                  {item.icon}
                </IconButton>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
