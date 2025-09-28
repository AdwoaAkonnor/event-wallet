// src/pages/TicketPage.jsx

import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { QRCodeCanvas } from 'qrcode.react'   // ✅ Correct import

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
          Go back and get ticket again (or run backend so tickets persist).
        </p>
        <button className="btn" onClick={() => navigate('/')}>
          Home
        </button>
      </div>
    )
  }

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>✅ Payment Verified</h2>
      <div
        className="card"
        style={{
          display: 'inline-block',
          textAlign: 'left',
          padding: '16px',
          border: '1px solid var(--card-border)',
          borderRadius: '8px',
          backgroundColor: '#fff',
        }}
      >
        <div style={{ fontWeight: 700 }}>{ticket.eventTitle}</div>
        <div className="muted">
          {ticket.department} • {ticket.ticketType}
        </div>
        <div style={{ marginTop: 8, fontWeight: 700 }}>{ticket.ticketCode}</div>
        <div style={{ marginTop: 12, textAlign: 'center' }}>
          {qr ? (
            <img src={qr} alt="QR" style={{ width: 160, height: 160 }} />
          ) : (
            <QRCodeCanvas value={ticket.ticketCode || 'NO-CODE'} size={160} />
          )}
        </div>
        <div style={{ marginTop: 12 }}>
          <button className="btn" onClick={() => window.print()}>
            Download / Print
          </button>
        </div>
      </div>
      <p style={{ marginTop: 12 }}>
        Please take a screenshot of this ticket for entry.
      </p>
    </div>
  )
}
