// src/pages/TicketPage.jsx
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { QRCodeCanvas } from 'qrcode.react'

export default function TicketPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const ticket = location.state?.ticket
  const qr = location.state?.qr

  if (!ticket) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h3>No ticket data available</h3>
        <p>
          If you refreshed the page, the demo does not persist ticket display.
          Go back and get the ticket again (or run backend so tickets persist).
        </p>
        <button className="btn" onClick={() => navigate('/')}>
          Home
        </button>
      </div>
    )
  }

  return (
    <div
      style={{
        textAlign: 'center',
        padding: '30px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <h2 style={{ color: 'var(--primary)', marginBottom: 20 }}>
        ✅ Ticket Confirmed
      </h2>

      <div
        className="ticket-card"
        style={{
          backgroundColor: '#fff',
          borderRadius: '16px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
          padding: '24px',
          maxWidth: '400px',
          width: '100%',
          textAlign: 'center',
          border: '1px dashed #999'
        }}
      >
        {/* Event Title */}
        <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>
          {ticket.eventTitle}
        </h3>

        {/* Department & Type */}
        <p className="muted" style={{ margin: 0 }}>
          {ticket.department} • {ticket.ticketType}
        </p>

        {/* Ticket Code */}
        <div
          style={{
            marginTop: 12,
            fontWeight: 700,
            fontSize: '18px',
            letterSpacing: '1px'
          }}
        >
          {ticket.ticketCode}
        </div>

        {/* QR Code */}
        <div style={{ marginTop: 20, marginBottom: 16 }}>
          {qr ? (
            <img
              src={qr}
              alt="QR"
              style={{
                width: 180,
                height: 180,
                borderRadius: 12,
                border: '4px solid var(--primary)'
              }}
            />
          ) : (
            <QRCodeCanvas
              value={ticket.ticketCode || 'NO-CODE'}
              size={180}
              bgColor="#ffffff"
              fgColor="#000000"
              includeMargin={true}
              style={{ borderRadius: 12, border: '4px solid var(--primary)' }}
            />
          )}
        </div>

        {/* Event Details */}
        <div style={{ fontSize: '14px', marginTop: 8 }}>
          <div>
            <strong>Date:</strong> {ticket.date || 'TBA'}
          </div>
          <div>
            <strong>Type:</strong> {ticket.ticketType}
          </div>
        </div>

        {/* Download/Print Button */}
        <div style={{ marginTop: 20 }}>
          <button
            className="btn"
            onClick={() => window.print()}
            style={{ width: '100%' }}
          >
            🧾 Download / Print Ticket
          </button>
        </div>
      </div>

      <p style={{ marginTop: 16, fontSize: '14px', color: '#444' }}>
        Please screenshot or print this ticket to show at the event entrance.
      </p>
    </div>
  )
}
