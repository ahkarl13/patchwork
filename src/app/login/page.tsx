'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError(error.message); setLoading(false) }
    else window.location.href = '/admin'
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fafafa' }}>
      <div style={{ width: 360, padding: 32, border: '1px solid #e5e5e5', borderRadius: 12, background: '#fff' }}>
        <h1 style={{ fontSize: 18, fontWeight: 600, marginBottom: 6 }}>Patchwork Admin</h1>
        <p style={{ fontSize: 13, color: '#999', marginBottom: 24 }}>Sign in to manage listings</p>
        {error && <div style={{ padding: 10, background: '#fef2f2', borderRadius: 7, fontSize: 13, color: '#991b1b', marginBottom: 14 }}>{error}</div>}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required
            style={{ padding: '10px 12px', border: '1px solid #e5e5e5', borderRadius: 8, fontSize: 14 }} />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required
            style={{ padding: '10px 12px', border: '1px solid #e5e5e5', borderRadius: 8, fontSize: 14 }} />
          <button type="submit" disabled={loading}
            style={{ padding: '10px', background: '#000', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, cursor: 'pointer' }}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
