// src/pages/PaymentPage.jsx
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const API_BASE = 'http://localhost:4000'

export default function PaymentPage() {
  const { eventId } = useParams()
  const [ev, setEv] = useState(null)
  const [phone, setPhone] = useState('')
  const [ticketType, setTicketType] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchEvent() {
      const res = await fetch(`${API_BASE}/api/events`)
      const list = await res.json()
      const found = list.find(x => String(x.id) === String(eventId))
      setEv(found)
      setTicketType(found?.ticketOptions?.[0]?.type || 'General')
    }
    fetchEvent()
  }, [eventId])

  if (!ev) return <p>Loading...</p>

  async function handlePay() {
    if (!ev.free && !phone) {
      alert('Please enter phone number')
      return
    }
    const res = await fetch(`${API_BASE}/api/pay`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventId: ev.id, ticketType, phoneNumber: phone })
    })
    const data = await res.json()
    if (data?.ticket) navigate(`/ticket/${data.ticket.id}`, { state: { ticket: data.ticket } })
  }

  return (
    <div>
      <h2 style={{ color: 'var(--primary)' }}>Payment — {ev.title}</h2>
      <div className="card">
        <div><strong>Department:</strong> {ev.department}</div>
        <div style={{ marginTop: 8 }}>
          <strong>Price:</strong> {ev.free ? 'FREE' : `GHS ${ev.ticketOptions?.find(t => t.type === ticketType)?.price}`}
        </div>
        {!ev.free && (
          <>
            <div style={{ marginTop: 8 }}>
              <label>Ticket Type</label>
              <select value={ticketType} onChange={e => setTicketType(e.target.value)}>
                {ev.ticketOptions.map(t => <option key={t.type}>{t.type}</option>)}
              </select>
            </div>
            <div style={{ marginTop: 8 }}>
              <label>MoMo Number</label>
              <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+233..." />
            </div>
          </>
        )}
        <div style={{ marginTop: 12 }}>
          <button className="btn" onClick={handlePay}>
            {ev.free ? 'Get Free Ticket' : 'Pay with MoMo'}
          </button>
        </div>
      </div>
    </div>
  )
}