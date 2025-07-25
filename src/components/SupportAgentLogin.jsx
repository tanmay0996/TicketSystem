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
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';

// Import social icons
import { FaGoogle } from 'react-icons/fa';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function SupportAgentLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successOpen, setSuccessOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Support Agent logged in:', user);

      // Show the success notification
      setSuccessOpen(true);
      
      // Delay navigation so the user can see the notification (e.g., 1.5 seconds)
      setTimeout(() => {
        navigate('/agent-dashboard');
      }, 1500);
    } catch (error) {
      console.error('Login error:', error);
      setErrorMsg(error.message);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSuccessOpen(false);
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

      {/* Snackbar for successful login notification */}
      <Snackbar
        open={successOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Login successful!
        </Alert>
      </Snackbar>
    </Box>
  );
}
