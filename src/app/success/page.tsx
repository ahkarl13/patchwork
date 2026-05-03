import Link from 'next/link'

export default function SuccessPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fafafa' }}>
      <div style={{ textAlign: 'center', padding: 40 }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, margin: '0 auto 20px' }}>✓</div>
        <h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 8 }}>Your job is live</h1>
        <p style={{ fontSize: 14, color: '#666', marginBottom: 28, maxWidth: 320, margin: '0 auto 28px' }}>
          Payment confirmed. Your listing is now published and visible to developers.
        </p>
        <Link href="/" style={{ fontSize: 14, fontWeight: 500, color: '#fff', background: '#000', padding: '10px 24px', borderRadius: 8, textDecoration: 'none' }}>
          View the board →
        </Link>
      </div>
    </div>
  )
}
