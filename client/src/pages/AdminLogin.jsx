import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminLogin(){
  const [code, setCode] = useState('')
  const nav = useNavigate()
  function submit(){
    if(code === 'ADMIN2025') nav('/admin/dashboard')
    else alert('Invalid admin code')
  }
  return (
    <div style={{maxWidth:600,margin:'40px auto'}}>
      <h3>Admin Login</h3>
      <input placeholder="Enter admin key" value={code} onChange={e => setCode(e.target.value)} />
      <div style={{marginTop:10}}><button className="btn" onClick={submit}>Enter</button></div>
    </div>
  )
}
