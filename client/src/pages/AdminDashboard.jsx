import React, { useEffect, useState } from "react"

const API_BASE = "http://localhost:4000"   // ✅ Centralized API URL

export default function AdminDashboard() {
  const [title, setTitle] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [department, setDepartment] = useState("COMPSSA")
  const [outline, setOutline] = useState("")
  const [free, setFree] = useState(false)
  const [ticketType, setTicketType] = useState("Single")
  const [price, setPrice] = useState("")
  const [groups, setGroups] = useState({ COMPSSA: [], UGASS: [], ESUG: [] })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function loadEvents() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API_BASE}/api/events`)
      const list = await res.json()
      const out = { COMPSSA: [], UGASS: [], ESUG: [] }
      list.forEach(ev => {
        if (out[ev.department]) out[ev.department].push(ev)
      })
      setGroups(out)
    } catch (err) {
      console.error("Error loading events:", err)
      setError("Could not load events. Server may be down.")
      setGroups({ COMPSSA: [], UGASS: [], ESUG: [] })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadEvents()
  }, [])

  async function publish() {
    const payload = {
      title,
      date,
      time,
      department,
      outline,
      free,
      ticketOptions: free ? [] : [{ type: ticketType, price: Number(price) || 0 }],
    }

    try {
      await fetch(`${API_BASE}/api/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      alert("✅ Event Published")
      setTitle("")
      setDate("")
      setTime("")
      setOutline("")
      setFree(false)
      setPrice("")
      setTicketType("Single")
      loadEvents()
    } catch (err) {
      console.error("Error publishing event:", err)
      alert("❌ Could not publish. Server may be down.")
    }
  }

  async function remove(id) {
    if (!confirm("Delete event?")) return
    try {
      await fetch(`${API_BASE}/api/events/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "ADMIN2025" }),
      })
      loadEvents()
    } catch (err) {
      console.error("Error deleting event:", err)
      alert("❌ Could not delete. Server may be down.")
    }
  }

  return (
    <div style={{ display: "flex", gap: 20 }}>
      {/* Create Event Form */}
      <div style={{ flex: 1 }}>
        <h3>Create Event</h3>
        <input
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
          <input
            placeholder="Time (optional)"
            value={time}
            onChange={e => setTime(e.target.value)}
          />
        </div>

        <select
          value={department}
          onChange={e => setDepartment(e.target.value)}
          style={{ marginTop: 8 }}
        >
          <option>COMPSSA</option>
          <option>UGASS</option>
          <option>ESUG</option>
        </select>

        <textarea
          placeholder="Outline"
          value={outline}
          onChange={e => setOutline(e.target.value)}
          style={{ width: "100%", height: 80, marginTop: 8 }}
        />

        <div style={{ marginTop: 8 }}>
          <label>
            <input
              type="checkbox"
              checked={free}
              onChange={e => setFree(e.target.checked)}
            />{" "}
            Free Event
          </label>
        </div>

        {!free && (
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <select
              value={ticketType}
              onChange={e => setTicketType(e.target.value)}
            >
              <option>Single</option>
              <option>Double</option>
            </select>
            <input
              placeholder="Price"
              value={price}
              onChange={e => setPrice(e.target.value)}
            />
          </div>
        )}

        <div style={{ marginTop: 12 }}>
          <button className="btn" onClick={publish}>
            Publish Event
          </button>
        </div>
      </div>

      {/* Published Events */}
      <div style={{ flex: 1 }}>
        <h3>Published Events</h3>
        {loading && <p>Loading events...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {Object.keys(groups).map(dep => (
          <div key={dep}>
            <h4 style={{ color: "var(--primary)" }}>
              {dep} ({groups[dep]?.length || 0})
            </h4>
            {(groups[dep] || []).map(ev => (
              <div
                key={ev.id}
                className="card"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontWeight: 700 }}>{ev.title}</div>
                  <div className="muted">
                    {ev.date} • {ev.free ? "FREE" : "GHS " + ev.ticketOptions?.[0]?.price}
                  </div>
                </div>
                <div>
                  <button
                    style={{ color: "#dc2626" }}
                    onClick={() => remove(ev.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
