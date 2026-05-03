'use client'
import { useState } from 'react'

export default function PostJobPage() {
  const [form, setForm] = useState({
    company: '', website: '', title: '', description: '',
    location: 'Remote', salaryMin: '', salaryMax: '',
    tags: '', applyUrl: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function set(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    const data = await res.json()
    if (data.error) { setError(data.error); setLoading(false) }
    else window.location.href = data.url
  }

  const inputStyle = { width: '100%', padding: '10px 12px', border: '1px solid #e5e5e5', borderRadius: 8, fontSize: 14, boxSizing: 'border-box' as const }
  const labelStyle = { fontSize: 12, fontWeight: 500, color: '#555', display: 'block', marginBottom: 5 }

  return (
    <div style={{ minHeight: '100vh', background: '#fafafa' }}>
      <nav style={{ background: '#fff', borderBottom: '1px solid #f0f0f0', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center' }}>
        <a href="/" style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.03em', textDecoration: 'none', color: '#000' }}>patchwork</a>
      </nav>

      <div style={{ maxWidth: 620, margin: '40px auto', padding: '0 24px' }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>Post a job</h1>
        <p style={{ fontSize: 14, color: '#666', marginBottom: 32 }}>$199 per listing · live for 30 days · seen by remote devs</p>

        {error && <div style={{ padding: 12, background: '#fef2f2', borderRadius: 8, fontSize: 13, color: '#991b1b', marginBottom: 20 }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ background: '#fff', border: '1px solid #f0f0f0', borderRadius: 12, padding: 24 }}>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', color: '#999', marginBottom: 16 }}>COMPANY</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={labelStyle}>Company name *</label>
                <input style={inputStyle} value={form.company} onChange={e => set('company', e.target.value)} required placeholder="Acme Inc" />
              </div>
              <div>
                <label style={labelStyle}>Company website</label>
                <input style={inputStyle} value={form.website} onChange={e => set('website', e.target.value)} placeholder="https://acme.com" />
              </div>
            </div>
          </div>

          <div style={{ background: '#fff', border: '1px solid #f0f0f0', borderRadius: 12, padding: 24 }}>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', color: '#999', marginBottom: 16 }}>ROLE</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={labelStyle}>Job title *</label>
                <input style={inputStyle} value={form.title} onChange={e => set('title', e.target.value)} required placeholder="Senior Full-Stack Engineer" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                <div style={{ gridColumn: '1' }}>
                  <label style={labelStyle}>Location</label>
                  <select style={inputStyle} value={form.location} onChange={e => set('location', e.target.value)}>
                    <option>Remote</option>
                    <option>Remote US</option>
                    <option>Remote EU</option>
                    <option>Hybrid</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Salary min ($k)</label>
                  <input style={inputStyle} type="number" value={form.salaryMin} onChange={e => set('salaryMin', e.target.value)} placeholder="80" />
                </div>
                <div>
                  <label style={labelStyle}>Salary max ($k)</label>
                  <input style={inputStyle} type="number" value={form.salaryMax} onChange={e => set('salaryMax', e.target.value)} placeholder="140" />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Tags <span style={{ color: '#bbb', fontWeight: 400 }}>(comma separated)</span></label>
                <input style={inputStyle} value={form.tags} onChange={e => set('tags', e.target.value)} placeholder="React, TypeScript, Node.js" />
              </div>
              <div>
                <label style={labelStyle}>Job description *</label>
                <textarea style={{ ...inputStyle, resize: 'vertical' }} value={form.description} onChange={e => set('description', e.target.value)} required rows={8} placeholder="Describe the role, responsibilities, requirements..." />
              </div>
              <div>
                <label style={labelStyle}>Apply URL *</label>
                <input style={inputStyle} value={form.applyUrl} onChange={e => set('applyUrl', e.target.value)} required placeholder="https://jobs.acme.com/apply or mailto:jobs@acme.com" />
              </div>
            </div>
          </div>

          <div style={{ background: '#fff', border: '1px solid #f0f0f0', borderRadius: 12, padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600 }}>One-time payment</div>
              <div style={{ fontSize: 13, color: '#666' }}>Live for 30 days · promoted to devs</div>
            </div>
            <div style={{ fontSize: 28, fontWeight: 700 }}>$199</div>
          </div>

          <button type="submit" disabled={loading}
            style={{ padding: '14px', background: '#000', color: '#fff', border: 'none', borderRadius: 9, fontSize: 15, fontWeight: 500, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Redirecting to payment...' : 'Continue to payment →'}
          </button>
        </form>
      </div>
    </div>
  )
}
