import { client } from '@/sanity/lib/client'
import { blogStatsQuery } from '@/sanity/lib/queries'

async function fetchStats() {
  const { startupCount, founderCount } = await client.fetch<{ startupCount: number; founderCount: number }>(blogStatsQuery)

  return [
    { value: String(startupCount), label: 'Startups omtalt' },
    { value: String(founderCount), label: 'Gründere intervjuet' },
    { value: '13', label: 'Arbeidsplasser lagd' },
  ]
}

export default async function AboutStats({ byNumbers, yearsH2 }: { byNumbers: string; yearsH2: string }) {
  const stats = await fetchStats()

  return (
    <section className="section">
      <div className="container text-center">
        <span className="label">{byNumbers}</span>
        <h2>{yearsH2}</h2>
        <div className="grid-3" style={{ marginTop: 'var(--gap-md)', maxWidth: 700, margin: 'var(--gap-md) auto 0' }}>
          {stats.map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <h2 style={{ fontSize: '3rem', marginBottom: 4 }}>{s.value}</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
