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
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { auth } from '../firebaseConfig';

export default function SupportAgentLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Support Agent logged in:', user);
      // Redirect to /agent-dashboard after successful login
      navigate('/agent-dashboard');
    } catch (error) {
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
      <DialogTitle sx={{ textAlign: 'center' }}>Support Agent Login</DialogTitle>
      <DialogContent>
        <Typography variant="body2" align="center" sx={{ mb: 2 }}>
          Sign in with your support agent credentials
        </Typography>

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

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <FormControlLabel control={<Checkbox />} label="Remember me" />
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Box>

          <Button type="submit" variant="contained" sx={{ mt: 1 }}>
            Log In
          </Button>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" align="center">
            Don’t have an agent account?{' '}
            <Link href="#" variant="body2">
              Contact Admin
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
