import React from 'react';
import { Drawer, Toolbar, List, ListItem, ListItemIcon, ListItemText, Box, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import LogoutButton from '../components/Logout';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../firebaseConfig';

const drawerWidth = 240;

export default function Sidebar() {
  const [user] = useAuthState(auth);

  // Example: Determine if the logged-in user is a support agent.
  // You might use a more reliable method, such as a custom claim or a value stored in your user profile.
  const isAgent = user?.email?.includes('agent'); // Replace with your actual logic

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { 
          width: drawerWidth, 
          boxSizing: 'border-box' 
        },
      }}
    >
      {/* Ensures the sidebar starts below the Navbar */}
      <Toolbar />
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Navigation Items */}
        <List sx={{ flexGrow: 1 }}>
          <ListItem button component={Link} to={isAgent ? "/agent-dashboard" : "/"}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={Link} to="/tickets">
            <ListItemIcon>
              <ConfirmationNumberIcon />
            </ListItemIcon>
            <ListItemText primary="Tickets" />
          </ListItem>
          {/* Add more sidebar items as needed */}
        </List>
        <Divider />
        {/* Logout Section */}
        <Box sx={{ p: 2 }}>
          <LogoutButton />
        </Box>
      </Box>
    </Drawer>
  );
}
