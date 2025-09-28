// src/components/EventCard.jsx
import React from 'react'

export default function EventCard({ ev, onView }) {
  return (
    <div
      className="card"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div>
        <div style={{ fontWeight: 700 }}>{ev.title}</div>
        <div className="muted">
          {ev.date} {ev.time && '• ' + ev.time}
        </div>
        <div className="muted">
          {ev.free ? (
            <span style={{ color: 'var(--success)' }}>FREE</span>
          ) : (
            <span>{`GHS ${ev.ticketOptions?.[0]?.price ?? ''}`}</span>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <button className="btn" onClick={onView}>View Details</button>
      </div>
    </div>
  )
}
