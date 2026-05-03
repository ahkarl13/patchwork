import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: jobs } = await supabase
    .from('jobs')
    .select('*, companies(name)')
    .order('created_at', { ascending: false })

  return (
    <div style={{ minHeight: '100vh', background: '#fafafa' }}>
      <nav style={{ background: '#fff', borderBottom: '1px solid #f0f0f0', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 16, fontWeight: 700 }}>patchwork admin</span>
        <a href="/" style={{ fontSize: 13, color: '#666', textDecoration: 'none' }}>View board ↗</a>
      </nav>

      <div style={{ maxWidth: 800, margin: '32px auto', padding: '0 24px' }}>
        <h1 style={{ fontSize: 20, fontWeight: 600, marginBottom: 24 }}>All listings ({jobs?.length || 0})</h1>

        {(!jobs || jobs.length === 0) && (
          <div style={{ textAlign: 'center', padding: 48, border: '1px dashed #e5e5e5', borderRadius: 10, color: '#999' }}>No jobs yet</div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {(jobs || []).map((job: any) => (
            <div key={job.id} style={{ background: '#fff', border: '1px solid #f0f0f0', borderRadius: 10, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{job.title}</div>
                <div style={{ fontSize: 12, color: '#999', marginTop: 2 }}>{job.companies?.name} · {job.location} · {new Date(job.created_at).toLocaleDateString()}</div>
              </div>
              <span style={{
                fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 20,
                background: job.status === 'published' ? '#f0fdf4' : '#fef9ec',
                color: job.status === 'published' ? '#166534' : '#92400e',
              }}>
                {job.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
