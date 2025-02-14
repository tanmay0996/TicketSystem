// EditTicket.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  FormControl,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';

const db = getFirestore();

export default function EditTicket() {
  const { id } = useParams();
  const navigate = useNavigate();

  // State for ticket fields
  const [ticketData, setTicketData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    category: '',
    contactEmail: '',
    phone: '',
    ticketDate: '',
    agreedToTerms: false,
    severity: '1',
    subscribe: false,
    status: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTicket() {
      try {
        const ticketRef = doc(db, "tickets", id);
        const ticketSnap = await getDoc(ticketRef);
        if (ticketSnap.exists()) {
          setTicketData(ticketSnap.data());
        } else {
          console.error("No such ticket!");
        }
      } catch (error) {
        console.error("Error fetching ticket: ", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTicket();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTicketData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const ticketRef = doc(db, "tickets", id);
      await updateDoc(ticketRef, {
        ...ticketData,
        updatedAt: new Date()
      });
      console.log("Ticket updated!");
      navigate('/'); // Redirect back to Dashboard or another page
    } catch (error) {
      console.error("Error updating ticket: ", error);
    }
  };

  if (loading) {
    return <Typography align="center" sx={{ mt: 4 }}>Loading ticket data...</Typography>;
  }

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
        Edit Ticket
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Title"
          name="title"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          value={ticketData.title}
          onChange={handleChange}
        />
        <TextField
          label="Description"
          name="description"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          required
          value={ticketData.description}
          onChange={handleChange}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="priority-label">Priority</InputLabel>
          <Select
            labelId="priority-label"
            name="priority"
            value={ticketData.priority}
            onChange={handleChange}
            label="Priority"
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            name="category"
            value={ticketData.category}
            onChange={handleChange}
            label="Category"
          >
            <MenuItem value="bug">Bug</MenuItem>
            <MenuItem value="feature">Feature Request</MenuItem>
            <MenuItem value="support">Support</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Contact Email"
          name="contactEmail"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          value={ticketData.contactEmail}
          onChange={handleChange}
        />
        <TextField
          label="Phone"
          name="phone"
          variant="outlined"
          fullWidth
          margin="normal"
          value={ticketData.phone}
          onChange={handleChange}
        />
        <TextField
          label="Ticket Date"
          name="ticketDate"
          type="date"
          fullWidth
          margin="normal"
          value={ticketData.ticketDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <FormControl component="fieldset" margin="normal">
          <InputLabel id="severity-label">Severity</InputLabel>
          <Select
            labelId="severity-label"
            name="severity"
            value={ticketData.severity}
            onChange={handleChange}
            label="Severity"
          >
            <MenuItem value="1">1 (Lowest)</MenuItem>
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="3">3</MenuItem>
            <MenuItem value="4">4 (Highest)</MenuItem>
          </Select>
        </FormControl>
        {/* Optional: Status field */}
        <TextField
          label="Status"
          name="status"
          variant="outlined"
          fullWidth
          margin="normal"
          value={ticketData.status}
          onChange={handleChange}
          helperText="e.g., Open, In Progress, Closed"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="subscribe"
              checked={ticketData.subscribe}
              onChange={handleChange}
            />
          }
          label="Subscribe to updates"
          sx={{ mt: 2 }}
        />
        <FormControlLabel
          control={
            <Checkbox
              name="agreedToTerms"
              checked={ticketData.agreedToTerms}
              onChange={handleChange}
              required
            />
          }
          label="I agree to the terms and conditions"
          sx={{ mt: 1 }}
        />
        <Button variant="contained" color="primary" type="submit" sx={{ mt: 3 }}>
          Update Ticket
        </Button>
      </Box>
    </Paper>
  );
}
