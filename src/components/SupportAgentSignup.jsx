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
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

// Material UI icons
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
// react-icons for Google icon
import { FaGoogle } from 'react-icons/fa';

export default function SupportAgentSignup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successOpen, setSuccessOpen] = useState(false);
  const navigate = useNavigate();

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

      // Show the success notification
      setSuccessOpen(true);

      // Optionally, reset the form fields
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      // Redirect to the agent dashboard after a short delay
      setTimeout(() => {
        navigate('/agent-dashboard');
      }, 1500);
    } catch (error) {
      console.error('Signup error:', error);
      setErrorMsg(error.message);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setSuccessOpen(false);
  };

  // Placeholder functions for social signups
  const handleGoogleSignup = () => {
    console.log('Google signup clicked');
    // Implement Google signup logic here
  };

  const handleFacebookSignup = () => {
    console.log('Facebook signup clicked');
    // Implement Facebook signup logic here
  };

  const handleGithubSignup = () => {
    console.log('GitHub signup clicked');
    // Implement GitHub signup logic here
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

        <Divider sx={{ my: 2 }} />

        <Box display="flex" justifyContent="center" gap={2}>
          <IconButton aria-label="Sign up with Google" onClick={handleGoogleSignup}>
            <FaGoogle size={32} />
          </IconButton>
          <IconButton aria-label="Sign up with Facebook" onClick={handleFacebookSignup}>
            <FacebookIcon fontSize="large" />
          </IconButton>
          <IconButton aria-label="Sign up with GitHub" onClick={handleGithubSignup}>
            <GitHubIcon fontSize="large" />
          </IconButton>
        </Box>
      </DialogContent>

      {/* Snackbar for successful signup notification */}
      <Snackbar
        open={successOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Successfully signed up!
        </Alert>
      </Snackbar>
    </Box>
  );
}
