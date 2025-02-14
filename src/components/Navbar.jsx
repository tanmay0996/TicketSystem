// Navbar.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Avatar, Box } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link } from 'react-router-dom';
import SignupMenu from './SignupMenu';
import LoginMenu from './LoginMenu';
import Logout from './Logout';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig';

export default function Navbar() {
  const [user] = useAuthState(auth);

  // If user exists, generate a random (deterministic) avatar URL using their UID
  // DiceBear creates a unique avatar based on the seed (here, user.uid)
  const avatarSrc = user ? `https://avatars.dicebear.com/api/human/${user.uid}.svg` : null;

  // Use displayName if available, otherwise fallback to email
  const displayName = user ? (user.displayName || user.email) : '';

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
        {/* Right side: If user is logged in, show avatar and name; else, show login/signup */}
        {user ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar src={avatarSrc} alt={displayName} />
            <Typography variant="body1">{displayName}</Typography>
            {/* <Logout /> */}
          </Box>
        ) : (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <LoginMenu />
            <SignupMenu />
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
