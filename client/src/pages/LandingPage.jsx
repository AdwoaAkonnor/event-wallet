// src/pages/LandingPage.jsx
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function LandingPage() {
  const nav = useNavigate()
  return (
    <div style={{ textAlign: 'center', paddingTop: 40 }}>
      <h2 style={{ color: 'var(--primary)' }}>Select Your Department</h2>
      <div
        style={{
          display: 'flex',
          gap: 20,
          justifyContent: 'center',
          marginTop: 20,
        }}
      >
        <button className="btn" onClick={() => nav('/department/COMSSA')}>COMSSA</button>
        <button className="btn" onClick={() => nav('/department/UGASS')}>UGASS</button>
        <button className="btn" onClick={() => nav('/department/ESUG')}>ESUG</button>
      </div>
    </div>
  )
}
