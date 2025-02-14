// LoginMenu.jsx
import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function LoginMenu() {
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
        Login
      </Button>
      <Menu
        id="login-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleClose(null)}
      >
        <MenuItem onClick={() => handleClose('/login/customer')}>
          Customer Login
        </MenuItem>
        <MenuItem onClick={() => handleClose('/login/agent')}>
          Agent Login
        </MenuItem>
      </Menu>
    </>
  );
}
