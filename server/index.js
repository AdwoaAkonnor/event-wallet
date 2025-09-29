// server/index.js
const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 4000

app.use(cors())
app.use(express.json())

// 📝 Sample events storage (temporary — memory only)
let events = [
  {
    id: 'evt-1',
    title: 'COMPSSA Dinner',
    department: 'COMPSSA',
    date: '2025-10-07',
    time: '18:00',
    outline: 'Annual dinner with awards',
    free: false,
    ticketOptions: [
      { type: 'Single', price: 50 },
      { type: 'Double', price: 80 }
    ]
  },
  {
    id: 'evt-2',
    title: 'UGASS Seminar',
    department: 'UGASS',
    date: '2025-11-14',
    time: '10:00',
    outline: 'Leadership & research methods',
    free: true,
    ticketOptions: []
  }
]

// ✅ GET all events
app.get('/api/events', (req, res) => {
  res.json(events)
})

// ✅ POST create event (Admin)
app.post('/api/events', (req, res) => {
  const newEvent = { id: `evt-${Date.now()}`, ...req.body }
  events.push(newEvent)
  res.status(201).json(newEvent)
})

// ✅ DELETE event (Admin)
app.delete('/api/events/:id', (req, res) => {
  const { id } = req.params
  events = events.filter(e => e.id !== id)
  res.json({ message: 'Event deleted' })
})

// ✅ POST fake payment (MoMo)
app.post('/api/pay', (req, res) => {
  const { eventId, ticketType, phoneNumber } = req.body
  const ev = events.find(e => e.id === eventId)
  if (!ev) return res.status(404).json({ error: 'Event not found' })

  // Fake ticket generation
  const ticket = {
    id: `tkt-${Date.now()}`,
    eventTitle: ev.title,
    department: ev.department,
    ticketType: ticketType || 'General',
    ticketCode: `#${Math.floor(Math.random() * 1000000)}`
  }

  res.json({ ticket })
})

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`)
})
