// src/App.jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import DepartmentPage from './pages/DepartmentPage'
import EventDetailsPage from './pages/EventDetailsPage'
import PaymentPage from './pages/PaymentPage'
import TicketPage from './pages/TicketPage'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import Navbar from './components/Navbar'
import './App.css'

export default function App() {
  return (
    <div style={{ maxWidth: 1000, margin: '18px auto', padding: 12 }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/department/:deptName" element={<DepartmentPage />} />
        <Route path="/event/:eventId" element={<EventDetailsPage />} />
        <Route path="/pay/:eventId" element={<PaymentPage />} />
        <Route path="/ticket/:ticketId" element={<TicketPage />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </div>
  )
}
