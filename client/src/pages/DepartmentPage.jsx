// src/pages/DepartmentPage.jsx
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const API_BASE = 'http://localhost:4000'

export default function DepartmentPage() {
  const { deptName } = useParams()
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchEvents() {
      const res = await fetch(`${API_BASE}/api/events`)
      const list = await res.json()
      const filtered = list.filter(
        ev => ev.department.toLowerCase() === deptName.toLowerCase()
      )
      setEvents(filtered)
      setLoading(false)
    }
    fetchEvents()
  }, [deptName])

  if (loading) return <p>Loading events...</p>

  return (
    <div>
      <h2 style={{ color: 'var(--primary)' }}>{deptName} Events</h2>
      {events.length === 0 ? (
        <p>No events yet for this department.</p>
      ) : (
        events.map(ev => (
          <div key={ev.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <div>
              <div style={{ fontWeight: 700 }}>{ev.title}</div>
              <div className="muted">{ev.date} {ev.time && '• ' + ev.time}</div>
              <div className="muted">
                {ev.free ? 'FREE' : `GHS ${ev.ticketOptions?.[0]?.price ?? ''}`}
              </div>
            </div>
            <button className="btn" onClick={() => navigate(`/event/${ev.id}`)}>
              View Details
            </button>
          </div>
        ))
      )}
    </div>
  )
}
