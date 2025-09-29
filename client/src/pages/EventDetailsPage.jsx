// src/pages/EventDetailsPage.jsx
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const API_BASE = 'http://localhost:4000'

export default function EventDetailsPage() {
  const { eventId } = useParams()
  const [ev, setEv] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchEvent() {
      const res = await fetch(`${API_BASE}/api/events`)
      const list = await res.json()
      const found = list.find(x => String(x.id) === String(eventId))
      setEv(found)
    }
    fetchEvent()
  }, [eventId])

  if (!ev) return <p>Loading...</p>

  return (
    <div>
      <h2 style={{ color: 'var(--primary)' }}>{ev.title}</h2>
      <div className="card">
        <div><strong>Date:</strong> {ev.date} {ev.time}</div>
        <div style={{ marginTop: 8 }}><strong>Outline:</strong>
          <div className="muted" style={{ marginTop: 6 }}>{ev.outline || 'No outline provided'}</div>
        </div>
        <div style={{ marginTop: 10 }}>
          {ev.free
            ? <button className="btn" onClick={async ()=>{
                const res = await fetch(`${API_BASE}/api/pay`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ eventId: ev.id, ticketType: 'FREE' })
                })
                const data = await res.json()
                if (data?.ticket) navigate(`/ticket/${data.ticket.id}`, { state: { ticket: data.ticket } })
              }}>Get Free Ticket</button>
            : <button className="btn" onClick={() => navigate(`/pay/${ev.id}`)}>Pay with MoMo</button>
          }
        </div>
      </div>
    </div>
  )
}
