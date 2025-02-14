// SignupMenu.jsx
import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function SignupMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (route) => {
    setAnchorEl(null);
    if (route) {
      navigate(route);
    }
  };

  return (
    <>
      <Button color="inherit" onClick={handleClick}>
        Sign Up
      </Button>
      <Menu
        id="signup-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleClose(null)}
      >
        <MenuItem onClick={() => handleClose('/signup/customer')}>
          Customer Sign Up
        </MenuItem>
        <MenuItem onClick={() => handleClose('/signup/agent')}>
          Agent Sign Up
        </MenuItem>
      </Menu>
    </>
  );
}
