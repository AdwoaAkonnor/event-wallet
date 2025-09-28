import React, {useEffect,useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchAllEvents } from '../utils/api'

export default function PaymentPage(){
  const { eventId } = useParams()
  const nav = useNavigate()
  const [ev, setEv] = useState(null)
  const [ticketType, setTicketType] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    fetchAllEvents().then(list => {
      const e = list.find(x => String(x.id) === String(eventId))
      setEv(e)
      setTicketType(e?.ticketOptions?.[0]?.type || 'General')
    })
  },[eventId])

  if(!ev) return <p>Loading...</p>

  async function pay(){
    if(!ev.free && !phone){ alert('Enter phone number'); return }
    setLoading(true)
    const res = await fetch('/api/pay', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ eventId: ev.id, ticketType: ticketType, phoneNumber: phone })
    })
    const data = await res.json().catch(()=>null)
    setLoading(false)
    if(data?.ticket) nav('/ticket/' + data.ticket.id, { state: { ticket: data.ticket, qr: data.qrDataUrl }})
    else {
      alert('Payment could not be processed. If backend is not running, this is a demo fallback.')
    }
  }

  return (
    <div>
      <h2 style={{color:'var(--primary)'}}>Pay — {ev.title}</h2>
      <div className="card">
        <div><strong>Department:</strong> {ev.department}</div>
        <div style={{marginTop:8}}><strong>Price:</strong> {ev.free ? 'FREE' : 'GHS ' + ( ev.ticketOptions?.find(t=> t.type===ticketType)?.price ?? ev.ticketOptions?.[0]?.price)}</div>
        {!ev.free && <div style={{marginTop:8}}>
          <label>Ticket type</label>
          <select value={ticketType} onChange={(e) => setTicketType(e.target.value)}>
            {(ev.ticketOptions || []).map(t => <option key={t.type}>{t.type}</option>)}
          </select>
        </div>}
        {!ev.free && <div style={{marginTop:8}}>
          <label>MoMo Phone</label><br/>
          <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+233..." />
        </div>}
        <div style={{marginTop:12}}>
          <button className="btn" onClick={pay} disabled={loading}>{loading ? 'Processing...' : (ev.free ? 'Get Free Ticket' : 'Pay with MoMo')}</button>
        </div>
      </div>
    </div>
  )
}
