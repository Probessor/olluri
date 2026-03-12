import Link from 'next/link'

export interface StartupData {
  _id: string
  name: string
  slug?: { current: string }
  icon?: string
  tag?: string
  sector?: string
  city?: string
  description?: string
}

export default function StartupCard({ startup }: { startup: StartupData }) {
  return (
    <div className="startup-card">
      <div className="startup-logo">{startup.icon || '🚀'}</div>
      {startup.tag && <span className="tag">{startup.tag}</span>}
      <h4>{startup.name}</h4>
      {(startup.sector || startup.city) && (
        <span className="sector">{[startup.sector, startup.city].filter(Boolean).join(' · ')}</span>
      )}
      {startup.description && <p>{startup.description}</p>}
      <Link href="/blog" className="startup-link">Read more →</Link>
    </div>
  )
}
