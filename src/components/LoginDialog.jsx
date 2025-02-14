// LoginDialog.jsx
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Link,
  Divider,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
// Example social icons
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function LoginDialog({ open, onClose }) {
  // Handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement your login logic here
    // e.g., call an API, authenticate user, etc.
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      {/* Close Button in the top-right corner */}
      <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
        <IconButton aria-label="close" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Dialog Title */}
      <DialogTitle sx={{ textAlign: 'center', mt: 2 }}>
        Welcome to Ticket Raiser!
      </DialogTitle>

      <DialogContent>
        {/* Subtitle */}
        <Typography variant="body2" align="center" sx={{ mb: 2 }}>
          Please sign in to your account and start the adventure
        </Typography>

        {/* Login Form */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          {/* Email Field */}
          <TextField
            type="email"
            label="Email"
            variant="outlined"
            fullWidth
            required
          />
          {/* Password Field */}
          <TextField
            type="password"
            label="Password"
            variant="outlined"
            fullWidth
            required
          />

          {/* Remember Me / Forgot Password */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <FormControlLabel control={<Checkbox />} label="Remember me" />
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Box>

          {/* Login Button */}
          <Button type="submit" variant="contained" sx={{ mt: 1 }}>
            Log In
          </Button>
        </Box>

        {/* Sign Up Link */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" align="center">
            New on our platform?{' '}
            <Link href="#" variant="body2">
              Create an account
            </Link>
          </Typography>
        </Box>

        {/* Divider with "or" */}
        <Divider sx={{ my: 2 }}>or</Divider>

        {/* Social Logins (optional) */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <IconButton aria-label="google">
            <GoogleIcon />
          </IconButton>
          <IconButton aria-label="facebook">
            <FacebookIcon />
          </IconButton>
          <IconButton aria-label="github">
            <GitHubIcon />
          </IconButton>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
