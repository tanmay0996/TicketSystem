// CustomerLogin.jsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Link,
  Divider,
  DialogTitle,
  DialogContent
} from '@mui/material';

// 1. Import the necessary Firebase functions
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
export default function CustomerLogin() {
  // Local state for email, password, errors, etc.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
const navigate = useNavigate(); // Initialize navigate
  // 2. Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      // 3. Use Firebase Auth to sign in
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Signed in successfully
      const user = userCredential.user;
      console.log('Customer logged in:', user);
      // TODO: Redirect to a customer dashboard or wherever you need
      navigate('/')
    } catch (error) {
      // Handle login errors
      console.error('Login error:', error);
      setErrorMsg(error.message);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 400,
        mx: 'auto',
        mt: 8,
        p: 2,
        borderRadius: 2,
        boxShadow: 3
      }}
    >
      <DialogTitle sx={{ textAlign: 'center' }}>Customer Login</DialogTitle>
      <DialogContent>
        <Typography variant="body2" align="center" sx={{ mb: 2 }}>
          Please sign in to your customer account
        </Typography>

        {/* Show error message if login fails */}
        {errorMsg && (
          <Typography variant="body2" color="error" align="center" sx={{ mb: 1 }}>
            {errorMsg}
          </Typography>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          {/* Email */}
          <TextField
            type="email"
            label="Email"
            variant="outlined"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* Password */}
          <TextField
            type="password"
            label="Password"
            variant="outlined"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Remember Me + Forgot Password */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <FormControlLabel control={<Checkbox />} label="Remember me" />
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Box>

          {/* Submit */}
          <Button type="submit" variant="contained" sx={{ mt: 1 }}>
            Log In
          </Button>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" align="center">
            New customer?{' '}
            <Link href="#" variant="body2">
              Create an account
            </Link>
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }}>or</Divider>

        <Typography variant="body2" align="center">
          Login with Google, Facebook, etc. (optional)
        </Typography>
      </DialogContent>
    </Box>
  );
}
