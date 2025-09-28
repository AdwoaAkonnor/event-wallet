import React, {useEffect,useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchAllEvents } from '../utils/api'

export default function EventDetailsPage(){
  const { eventId } = useParams()
  const nav = useNavigate()
  const [ev, setEv] = useState(null)

  useEffect(()=>{
    fetchAllEvents().then(list => setEv(list.find(x => String(x.id) === String(eventId))))
  },[eventId])

  if(!ev) return <p>Loading...</p>

  return (
    <div>
      <h2 style={{color:'var(--primary)'}}>{ev.title}</h2>
      <div className="card">
        <div><strong>Date:</strong> {ev.date} {ev.time}</div>
        <div style={{marginTop:8}}><strong>Outline:</strong>
          <div className="muted" style={{marginTop:6}}>{ev.outline || 'No outline provided'}</div>
        </div>
        <div style={{marginTop:10}}>
          {ev.free
            ? <button className="btn" onClick={async ()=>{
                const res = await fetch('/api/pay', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ eventId: ev.id, ticketType: 'FREE' })})
                const data = await res.json().catch(()=>null)
                if (data?.ticket) nav('/ticket/' + data.ticket.id, { state: { ticket: data.ticket, qr: data.qrDataUrl } })
                else alert('If server not running, demo will not create a ticket. Connect backend to test full flow.')
              }}>Get Free Ticket</button>
            : <button className="btn" onClick={() => nav('/pay/' + ev.id)}>Pay with MoMo</button>
          }
        </div>
      </div>
    </div>
  )
}
