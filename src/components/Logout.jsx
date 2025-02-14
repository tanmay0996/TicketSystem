// Logout.jsx
import React from 'react';
import { Button } from '@mui/material';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // After logging out, navigate to your desired route (e.g., login page)
      navigate('/login/customer'); // or a common landing page
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Button variant="contained" color="primary" fullWidth onClick={handleLogout}>
      Logout
    </Button>
  );
}
