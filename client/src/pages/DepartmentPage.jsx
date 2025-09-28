import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import EventCard from '../components/EventCard'
import { fetchEvents } from '../utils/api'

export default function DepartmentPage() {
  const { deptName } = useParams()
  const navigate = useNavigate()
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetchEvents(deptName)
      .then(data => {
        setEvents(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching events:', err)
        setEvents([])
        setError('Could not load events. Please try again later.')
        setLoading(false)
      })
  }, [deptName])

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: 'var(--primary)' }}>{deptName} Events</h2>

      {loading && <p className="muted">Loading events...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && events.length === 0 && (
        <p className="muted">No events for {deptName}.</p>
      )}

      {events.map(ev => (
        <EventCard
          key={ev.id}
          ev={ev}
          onView={() => navigate(`/event/${encodeURIComponent(ev.id)}`)}
          onPay={() => navigate(`/pay/${encodeURIComponent(ev.id)}`)}
        />
      ))}
    </div>
  )
}
