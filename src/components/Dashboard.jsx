import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Divider,
  Box
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
// import { useAuthState } from 'react-firebase-hooks/auth';
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from '../firebaseConfig';

const db = getFirestore();

// Optional color mapping for priorities
const priorityColorMapping = {
  low: 'success',
  medium: 'warning',
  high: 'error'
};

export default function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [viewTicket, setViewTicket] = useState(null);
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  useEffect(() => {
    async function fetchTickets() {
      try {
        const querySnapshot = await getDocs(collection(db, "tickets"));
        const ticketsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setTickets(ticketsArray);
      } catch (error) {
        console.error("Error fetching tickets: ", error);
      }
    }
    fetchTickets();
  }, []);

  const handleView = (ticket) => {
    // Open modal with ticket details
    setViewTicket(ticket);
  };

  const handleEdit = (ticket) => {
    // Navigate to an edit page for the ticket
    navigate(`/editTicket/${ticket.id}`);
  };

  const handleDelete = async (ticket) => {
    if (window.confirm(`Are you sure you want to delete ticket: "${ticket.title}"?`)) {
      try {
        await deleteDoc(doc(db, "tickets", ticket.id));
        console.log("Ticket deleted:", ticket.id);
        // Update local state to remove the deleted ticket
        setTickets(prevTickets => prevTickets.filter(t => t.id !== ticket.id));
      } catch (error) {
        console.error("Error deleting ticket: ", error);
      }
    }
  };

  return (
    <>
      <TableContainer
        component={Paper}
        elevation={8}
        sx={{
          mt: 5,
          maxWidth: '100%',
          margin: 'auto',
          borderRadius: 3,
          transform: 'scale(0.9)'
        }}
      >
        <Table
          sx={{
            borderCollapse: 'separate',
            borderSpacing: '0px 15px',
            backgroundColor: '#f0f0f0',
            '& th, & td': {
              backgroundColor: '#ffffff'
            },
            '& thead th': {
              backgroundColor: '#1976d2',
              color: '#fff',
              fontWeight: 'bold'
            }
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>Ticket ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created By</TableCell>
              <TableCell>Assigned To</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell>{ticket.id}</TableCell>
                <TableCell>{ticket.title}</TableCell>
                <TableCell>{ticket.description}</TableCell>
                <TableCell>
                  <Chip
                    label={ticket.priority}
                    color={priorityColorMapping[ticket.priority] || 'default'}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={ticket.status || 'Open'}
                    color={ticket.status === 'Closed' ? 'default' : 'info'}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>{ticket.contactEmail}</TableCell>
                <TableCell>{ticket.assignedTo || 'Unassigned'}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleView(ticket)} color="primary">
                    <VisibilityIcon />
                  </IconButton>
                  {/* Only show Edit & Delete if the current user is the owner */}
                  {user && ticket.contactEmail === user.email && (
                    <>
                      <IconButton onClick={() => handleEdit(ticket)} color="secondary">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(ticket)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {tickets.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No tickets found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal Dialog for Viewing Ticket Details */}
      <Dialog
        open={Boolean(viewTicket)}
        onClose={() => setViewTicket(null)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Ticket Details</DialogTitle>
        <DialogContent dividers>
          {viewTicket && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="body1">
                <strong>Ticket ID:</strong> {viewTicket.id}
              </Typography>
              <Typography variant="body1">
                <strong>Title:</strong> {viewTicket.title}
              </Typography>
              <Typography variant="body1">
                <strong>Description:</strong> {viewTicket.description}
              </Typography>
              <Typography variant="body1">
                <strong>Priority:</strong> {viewTicket.priority}
              </Typography>
              <Typography variant="body1">
                <strong>Status:</strong> {viewTicket.status || 'Open'}
              </Typography>
              <Typography variant="body1">
                <strong>Created By:</strong> {viewTicket.contactEmail}
              </Typography>
              <Typography variant="body1">
                <strong>Assigned To:</strong> {viewTicket.assignedTo || 'Unassigned'}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewTicket(null)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
