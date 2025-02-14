// TicketView.jsx
import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { Box, Paper, Typography, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const db = getFirestore();

export default function TicketView() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTicket() {
      try {
        const ticketRef = doc(db, 'tickets', id);
        const ticketSnap = await getDoc(ticketRef);
        if (ticketSnap.exists()) {
          setTicket(ticketSnap.data());
        } else {
          console.error('No such ticket!');
        }
      } catch (error) {
        console.error('Error fetching ticket:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchTicket();
  }, [id]);

  if (loading) {
    return <Typography align="center" sx={{ mt: 4 }}>Loading ticket details...</Typography>;
  }

  if (!ticket) {
    return <Typography align="center" sx={{ mt: 4 }}>Ticket not found.</Typography>;
  }

  return (
    <Paper sx={{ p: 4, maxWidth: 600, margin: 'auto', mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        Ticket Details
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body1"><strong>Title:</strong> {ticket.title}</Typography>
        <Typography variant="body1"><strong>Description:</strong> {ticket.description}</Typography>
        <Typography variant="body1"><strong>Priority:</strong> {ticket.priority}</Typography>
        <Typography variant="body1"><strong>Status:</strong> {ticket.status || 'Open'}</Typography>
        <Typography variant="body1"><strong>Created By:</strong> {ticket.contactEmail}</Typography>
        <Typography variant="body1"><strong>Assigned To:</strong> {ticket.assignedTo || 'Unassigned'}</Typography>
        {/* Add any additional ticket fields here */}
      </Box>
      <Button variant="contained" onClick={() => navigate(-1)}>
        Back
      </Button>
    </Paper>
  );
}
