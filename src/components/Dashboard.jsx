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
  Box
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AutorenewIcon from '@mui/icons-material/Autorenew'; // For toggling status
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'; // For toggling assignment
import { getFirestore, collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../firebaseConfig';

const db = getFirestore();

// Optional color mapping for priorities
const priorityColorMapping = {
  low: 'success',
  medium: 'warning',
  high: 'error'
};

export default function Dashboard({ isAgentDashboard = false }) {
  const [tickets, setTickets] = useState([]);
  const [viewTicket, setViewTicket] = useState(null);
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  useEffect(() => {
    async function fetchTickets() {
      try {
        const querySnapshot = await getDocs(collection(db, "tickets"));
        let ticketsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        // For customer dashboard, filter tickets by the current user's email.
        if (!isAgentDashboard && user) {
          ticketsArray = ticketsArray.filter(ticket => ticket.contactEmail === user.email);
        }

        setTickets(ticketsArray);
      } catch (error) {
        console.error("Error fetching tickets: ", error);
      }
    }
    if (user) {
      fetchTickets();
    }
  }, [user, isAgentDashboard]);

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
        setTickets(prevTickets => prevTickets.filter(t => t.id !== ticket.id));
      } catch (error) {
        console.error("Error deleting ticket: ", error);
      }
    }
  };

  // Toggle status between "Open" and "Closed"
  const handleToggleStatus = async (ticket) => {
    const newStatus = ticket.status === "Closed" ? "Open" : "Closed";
    try {
      await updateDoc(doc(db, "tickets", ticket.id), { status: newStatus });
      setTickets(prevTickets =>
        prevTickets.map(t =>
          t.id === ticket.id ? { ...t, status: newStatus } : t
        )
      );
    } catch (error) {
      console.error("Error updating ticket status: ", error);
    }
  };

  // Toggle assignment between current agent's email and "Unassigned"
  const handleToggleAssignment = async (ticket) => {
    if (!user) return;
    const newAssignedTo =
      ticket.assignedTo && ticket.assignedTo !== "Unassigned"
        ? "Unassigned"
        : user.email;
    try {
      await updateDoc(doc(db, "tickets", ticket.id), { assignedTo: newAssignedTo });
      setTickets(prevTickets =>
        prevTickets.map(t =>
          t.id === ticket.id ? { ...t, assignedTo: newAssignedTo } : t
        )
      );
    } catch (error) {
      console.error("Error updating ticket assignment: ", error);
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
                  {isAgentDashboard && (
                    <>
                      <IconButton onClick={() => handleToggleStatus(ticket)} color="primary">
                        <AutorenewIcon />
                      </IconButton>
                      <IconButton onClick={() => handleToggleAssignment(ticket)} color="primary">
                        <AssignmentIndIcon />
                      </IconButton>
                    </>
                  )}
                  {/* For customers, show Edit & Delete if they own the ticket */}
                  {user && ticket.contactEmail === user.email && !isAgentDashboard && (
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
