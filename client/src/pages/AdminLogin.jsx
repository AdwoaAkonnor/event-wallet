import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminLogin() {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function submit(e) {
    e.preventDefault()
    if (code.trim() === 'ADMIN2025') {
      navigate('/admin/dashboard')
    } else {
      setError('❌ Invalid admin code')
    }
  }

  return (
    <div style={{ maxWidth: 480, margin: '40px auto', padding: 20 }}>
      <h3>Admin Login</h3>
      <form onSubmit={submit}>
        <input
          type="password"
          placeholder="Enter admin key"
          value={code}
          onChange={e => setCode(e.target.value)}
          style={{ width: '100%' }}
        />
        <div style={{ marginTop: 10 }}>
          <button className="btn" type="submit">Enter</button>
        </div>
        {error && <p style={{ color: 'red', marginTop: 8 }}>{error}</p>}
      </form>
    </div>
  )
}
