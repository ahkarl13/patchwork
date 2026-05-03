import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export default async function JobPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: job } = await supabase
    .from('jobs')
    .select('*, companies(name, website, logo_url)')
    .eq('id', id)
    .eq('status', 'published')
    .single()

  if (!job) notFound()

  return (
    <div style={{ minHeight: '100vh', background: '#fafafa' }}>
      <nav style={{ background: '#fff', borderBottom: '1px solid #f0f0f0', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center' }}>
        <Link href="/" style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.03em', textDecoration: 'none', color: '#000' }}>patchwork</Link>
      </nav>

      <div style={{ maxWidth: 700, margin: '40px auto', padding: '0 24px' }}>
        <Link href="/" style={{ fontSize: 13, color: '#999', textDecoration: 'none', display: 'block', marginBottom: 24 }}>← All jobs</Link>

        <div style={{ background: '#fff', border: '1px solid #f0f0f0', borderRadius: 12, padding: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 24 }}>
            <div style={{ width: 56, height: 56, borderRadius: 10, background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 700, color: '#999', flexShrink: 0 }}>
              {job.companies?.name?.[0] || '?'}
            </div>
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>{job.title}</h1>
              <div style={{ fontSize: 14, color: '#666' }}>
                {job.companies?.name} · {job.location}
                {job.salary_min && job.salary_max && ` · $${(job.salary_min/1000).toFixed(0)}k–$${(job.salary_max/1000).toFixed(0)}k`}
              </div>
            </div>
          </div>

          {(job.tags || []).length > 0 && (
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 24 }}>
              {job.tags.map((tag: string) => (
                <span key={tag} style={{ fontSize: 12, padding: '4px 10px', background: '#f5f5f5', borderRadius: 20, color: '#555' }}>{tag}</span>
              ))}
            </div>
          )}

          <div style={{ fontSize: 15, lineHeight: 1.8, color: '#333', whiteSpace: 'pre-wrap', marginBottom: 32 }}>
            {job.description}
          </div>

          <a href={job.apply_url} target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-block', padding: '12px 28px', background: '#000', color: '#fff', borderRadius: 9, fontSize: 15, fontWeight: 500, textDecoration: 'none' }}>
            Apply now →
          </a>
        </div>
      </div>
    </div>
  )
}
