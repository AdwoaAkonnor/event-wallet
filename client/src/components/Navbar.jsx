// src/components/Navbar.jsx
import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
      }}
    >
      <div>
        <h1 className="header-title" style={{ fontSize: 20 }}>
          Event Wallet
        </h1>
        <div className="muted" style={{ fontSize: 12 }}>
          Select your department, pay with MoMo, get a ticket
        </div>
      </div>
      <nav>
        <Link style={{ marginRight: 12 }} to="/">Home</Link>
        <Link to="/admin">Admin</Link>
      </nav>
    </header>
  )
}
