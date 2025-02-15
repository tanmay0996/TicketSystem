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
  DialogContent,
  Snackbar,
  Alert,
  IconButton
} from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

// Material UI icons for Facebook and GitHub
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
// react-icons for Google icon
import { FaGoogle } from 'react-icons/fa';

export default function CustomerLogin() {
  // Local state for email, password, errors, etc.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Customer logged in:', user);
      // Show success notification
      setOpenSnackbar(true);
      // Wait 2 seconds before navigating (so user sees the notification)
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Login error:', error);
      setErrorMsg(error.message);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  // Placeholder functions for social logins
  const handleGoogleLogin = () => {
    console.log('Google login clicked');
    // Implement Google login logic here
  };

  const handleFacebookLogin = () => {
    console.log('Facebook login clicked');
    // Implement Facebook login logic here
  };

  const handleGithubLogin = () => {
    console.log('GitHub login clicked');
    // Implement GitHub login logic here
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

        {/* <Typography variant="body2" align="center">
          Login with Google, Facebook, etc. (optional)
        </Typography> */}

        <Box display="flex" justifyContent="center" gap={2} sx={{ mt: 2 }}>
          <IconButton aria-label="Login with Google" onClick={handleGoogleLogin}>
            <FaGoogle size={32} />
          </IconButton>
          <IconButton aria-label="Login with Facebook" onClick={handleFacebookLogin}>
            <FacebookIcon fontSize="large" />
          </IconButton>
          <IconButton aria-label="Login with GitHub" onClick={handleGithubLogin}>
            <GitHubIcon fontSize="large" />
          </IconButton>
        </Box>
      </DialogContent>

      {/* Snackbar Notification for Successful Login */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Logged in successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}
