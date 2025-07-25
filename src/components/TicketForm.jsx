import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  Select,
  MenuItem,
  Checkbox,
  Button,
  InputLabel,
  InputAdornment,
  Snackbar,
  Alert,
} from '@mui/material';

import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

// Import Firestore functions
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Adjust the path as needed

export default function TicketForm() {
  // State for each field
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [ticketDate, setTicketDate] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Example: Additional fields
  const [severity, setSeverity] = useState('1'); // Could be 1, 2, 3, etc.
  const [subscribe, setSubscribe] = useState(false);

  // Snackbar state
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted!");

    // Construct the base ticket data
    const ticketData = {
      title,
      description,
      priority,
      category,
      contactEmail,
      phone,
      ticketDate,
      agreedToTerms,
      severity,
      subscribe,
      createdAt: new Date(), // Add a timestamp
    };

    try {
      // Add the ticket data to Firestore
      const docRef = await addDoc(collection(db, "tickets"), ticketData);
      console.log("Ticket written with ID: ", docRef.id);

      // Show a success message and clear the form
      setOpenSnackbar(true);
      setTitle('');
      setDescription('');
      setPriority('medium');
      setCategory('');
      setContactEmail('');
      setPhone('');
      setTicketDate('');
      setAgreedToTerms(false);
      setSeverity('1');
      setSubscribe(false);
    } catch (error) {
      console.error("Error adding ticket: ", error);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        maxWidth: 600,
        margin: 'auto',
        mt: 5,
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" mb={2}>
        Ticket Submission Form
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        {/* Title Field */}
        <TextField
          id="ticket-title"
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          }}
        />

        {/* Description Field */}
        <TextField
          id="ticket-description"
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Priority Radio Group */}
        <FormControl component="fieldset" sx={{ mt: 2 }}>
          <FormLabel component="legend">Priority</FormLabel>
          <RadioGroup
            row
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <FormControlLabel value="low" control={<Radio />} label="Low" />
            <FormControlLabel value="medium" control={<Radio />} label="Medium" />
            <FormControlLabel value="high" control={<Radio />} label="High" />
          </RadioGroup>
        </FormControl>

        {/* Category Dropdown */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="ticket-category-label">Category</InputLabel>
          <Select
            labelId="ticket-category-label"
            id="ticket-category"
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <MenuItem value="bug">Bug</MenuItem>
            <MenuItem value="feature">Feature Request</MenuItem>
            <MenuItem value="support">Support</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>

        {/* Contact Email Field */}
        <TextField
          id="contact-email"
          label="Contact Email"
          variant="outlined"
          fullWidth
          margin="normal"
          type="email"
          required
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
        />

        {/* Phone Field */}
        <TextField
          id="contact-phone"
          label="Phone"
          variant="outlined"
          fullWidth
          margin="normal"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneIcon />
              </InputAdornment>
            ),
          }}
        />

        {/* Date Field */}
        <TextField
          id="ticket-date"
          label="Date"
          type="date"
          fullWidth
          margin="normal"
          value={ticketDate}
          onChange={(e) => setTicketDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />

        {/* Severity Radio Group */}
        <FormControl component="fieldset" sx={{ mt: 2 }}>
          <FormLabel component="legend">Severity</FormLabel>
          <RadioGroup
            row
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
          >
            <FormControlLabel value="1" control={<Radio />} label="1 (Lowest)" />
            <FormControlLabel value="2" control={<Radio />} label="2" />
            <FormControlLabel value="3" control={<Radio />} label="3" />
            <FormControlLabel value="4" control={<Radio />} label="4 (Highest)" />
          </RadioGroup>
        </FormControl>

        {/* Subscribe to Updates Checkbox */}
        <FormControlLabel
          control={
            <Checkbox
              checked={subscribe}
              onChange={(e) => setSubscribe(e.target.checked)}
            />
          }
          label="Subscribe to updates"
          sx={{ display: 'block', mt: 2 }}
        />

        {/* Terms Checkbox */}
        <FormControlLabel
          control={
            <Checkbox
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              required
            />
          }
          label="I agree to the terms and conditions"
          sx={{ display: 'block', mt: 1 }}
        />

        {/* Submit Button */}
        <Button variant="contained" color="primary" type="submit" sx={{ mt: 3 }}>
          Submit Ticket
        </Button>
      </Box>

      {/* Snackbar Notification */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Form submitted successfully!
        </Alert>
      </Snackbar>
    </Paper>
  );
}
