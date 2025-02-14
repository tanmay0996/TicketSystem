// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';             // Your layout with Navbar/Sidebar
import CustomerLogin from './components/CustomerLogin';
import SupportAgentLogin from './components/SupportAgentLogin';
import Dashboard from './components/Dashboard';       // Example
import TicketForm from './components/TicketForm';     // Example
import CustomerSignup from './components/CustomerSignup';
import SupportAgentSignup from './components/SupportAgentSignup';
import EditTicket from './components/EditTicket';
import TicketView from './components/TicketView';
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Example default route */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/agent-dashboard" element={<Dashboard isAgentDashboard={true} />} />

          <Route path="/editTicket/:id" element={<EditTicket />} />
          <Route path="/ticket/:id" element={<TicketView />} />
          
          {/* Tickets route (for demonstration) */}
          <Route path="/tickets" element={<TicketForm />} />

          {/* Customer login page */}
          <Route path="/login/customer" element={<CustomerLogin />} />
          
          {/* Support Agent login page */}
          <Route path="/login/agent" element={<SupportAgentLogin />} />

          <Route path="/signup/customer" element={<CustomerSignup />} />
          <Route path="/signup/agent" element={<SupportAgentSignup />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
