import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function HomePage() {
  const supabase = await createClient()
  const { data: jobs } = await supabase
    .from('jobs')
    .select('*, companies(name, logo_url)')
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  return (
    <div style={{ minHeight: '100vh', background: '#fafafa' }}>
      {/* Nav */}
      <nav style={{ background: '#fff', borderBottom: '1px solid #f0f0f0', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.03em' }}>patchwork</span>
        <Link href="/post" style={{ fontSize: 13, fontWeight: 500, background: '#000', color: '#fff', padding: '7px 16px', borderRadius: 8, textDecoration: 'none' }}>
          Post a job — $199
        </Link>
      </nav>

      {/* Header */}
      <div style={{ background: '#fff', borderBottom: '1px solid #f0f0f0', padding: '40px 24px 32px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 8 }}>Remote dev jobs</h1>
          <p style={{ fontSize: 15, color: '#666' }}>Curated remote roles for developers. New jobs every week.</p>
        </div>
      </div>

      {/* Jobs list */}
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '24px' }}>
        {!jobs || jobs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#999', fontSize: 14 }}>
            No jobs posted yet. <Link href="/post" style={{ color: '#000', fontWeight: 500 }}>Be the first →</Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {jobs.map((job: any) => (
              <Link key={job.id} href={`/jobs/${job.id}`} style={{ textDecoration: 'none' }}>
                <div style={{ background: '#fff', border: '1px solid #f0f0f0', borderRadius: 10, padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 16, transition: 'border-color 0.1s' }}
                  onMouseEnter={(e: any) => e.currentTarget.style.borderColor = '#ddd'}
                  onMouseLeave={(e: any) => e.currentTarget.style.borderColor = '#f0f0f0'}>
                  <div style={{ width: 44, height: 44, borderRadius: 8, background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, color: '#999', flexShrink: 0 }}>
                    {job.companies?.name?.[0] || '?'}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: '#111', marginBottom: 3 }}>{job.title}</div>
                    <div style={{ fontSize: 13, color: '#666' }}>
                      {job.companies?.name} · {job.location}
                      {job.salary_min && job.salary_max && ` · $${(job.salary_min/1000).toFixed(0)}k–$${(job.salary_max/1000).toFixed(0)}k`}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                    {(job.tags || []).slice(0, 3).map((tag: string) => (
                      <span key={tag} style={{ fontSize: 11, padding: '3px 8px', background: '#f5f5f5', borderRadius: 20, color: '#555' }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
