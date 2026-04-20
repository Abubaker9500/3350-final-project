import { useState } from 'react'

export default function Login({ onLogin, onRegister }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.endsWith('@csub.edu')) {
      setError('Please use your @csub.edu email address.')
      return
    }
    if (!password) { setError('Please enter your password.'); return }
    onLogin()
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      background: 'var(--white)',
    }}>
      {/* Blue header */}
      <div style={{
        background: 'var(--blue)', padding: '48px 24px 36px',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="var(--yellow)">
            <path d="M12 2c0 0-5 4.5-5 9a5 5 0 0010 0c0-4.5-5-9-5-9zm0 12a2 2 0 01-2-2c0-1.5 2-4 2-4s2 2.5 2 4a2 2 0 01-2 2z"/>
          </svg>
          <span style={{ fontSize: 32, fontWeight: 800, color: 'var(--white)', letterSpacing: '-1px' }}>Rowdy</span>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14 }}>CSUB's Campus Dating App</p>
      </div>

      {/* Form */}
      <div style={{ flex: 1, padding: '32px 24px' }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24, color: 'var(--blue)' }}>Welcome back</h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={labelStyle}>CSUB Email</label>
            <input
              type="email" placeholder="you@csub.edu"
              value={email} onChange={e => { setEmail(e.target.value); setError('') }}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Password</label>
            <input
              type="password" placeholder="••••••••"
              value={password} onChange={e => { setPassword(e.target.value); setError('') }}
              style={inputStyle}
            />
          </div>
          {error && <p style={{ color: 'var(--red)', fontSize: 13 }}>{error}</p>}
          <button type="submit" style={primaryBtnStyle}>Sign In</button>
        </form>

        <div style={{ textAlign: 'center', marginTop: 28 }}>
          <p style={{ color: 'var(--gray-600)', fontSize: 14 }}>
            New to Rowdy?{' '}
            <button onClick={onRegister} style={{ color: 'var(--blue)', fontWeight: 700, fontSize: 14 }}>
              Create Account
            </button>
          </p>
        </div>
      </div>

      <div style={{ padding: '16px 24px', textAlign: 'center' }}>
        <p style={{ fontSize: 11, color: 'var(--gray-400)' }}>Do not sell or share my personal info</p>
      </div>
    </div>
  )
}

const labelStyle = {
  display: 'block', fontSize: 13, fontWeight: 600,
  color: 'var(--gray-600)', marginBottom: 6,
}
const inputStyle = {
  width: '100%', padding: '12px 14px', border: '1.5px solid var(--gray-200)',
  borderRadius: 10, fontSize: 15, outline: 'none',
  transition: 'border-color .15s',
}
const primaryBtnStyle = {
  width: '100%', padding: '14px', background: 'var(--blue)',
  color: 'var(--white)', borderRadius: 12, fontSize: 16,
  fontWeight: 700, marginTop: 4, transition: 'opacity .15s',
}
