// Navbar.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SignupMenu from '../components/SignupMenu';
import LoginMenu from '../components/LoginMenu';

export default function Navbar() {
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        {/* Left side: Icon and Application Name */}
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <AssignmentIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Ticket Raiser
        </Typography>
        {/* Right side: Login and Sign Up menus */}
        <LoginMenu />
        <SignupMenu />
      </Toolbar>
    </AppBar>
  );
}
