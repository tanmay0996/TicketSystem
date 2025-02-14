// SupportAgentSignup.jsx
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
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function SupportAgentSignup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Support Agent signed up:', user);
      // TODO: Optionally, store additional user data (e.g., role: "agent") in Firestore
    } catch (error) {
      console.error('Signup error:', error);
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
      <DialogTitle sx={{ textAlign: 'center' }}>Support Agent Signup</DialogTitle>
      <DialogContent>
        <Typography variant="body2" align="center" sx={{ mb: 2 }}>
          Create a new support agent account
        </Typography>

        {errorMsg && (
          <Typography variant="body2" color="error" align="center" sx={{ mb: 1 }}>
            {errorMsg}
          </Typography>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            type="email"
            label="Email"
            variant="outlined"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            type="password"
            label="Password"
            variant="outlined"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            type="password"
            label="Confirm Password"
            variant="outlined"
            fullWidth
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <FormControlLabel control={<Checkbox />} label="I agree to the Terms & Conditions" />

          <Button type="submit" variant="contained" sx={{ mt: 1 }}>
            Sign Up
          </Button>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" align="center">
            Already have an account?{' '}
            <Link href="/login/agent" variant="body2">
              Log In
            </Link>
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }}>or</Divider>

        <Typography variant="body2" align="center">
          Sign up with Google, Facebook, etc. (optional)
        </Typography>
      </DialogContent>
    </Box>
  );
}
