export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { eventsByDateQuery } from '@/sanity/lib/queries'

type EventData = {
  _id: string
  title: string
  date?: string
  location?: string
  city?: string
  description?: string
  link?: string
  source?: string
}

function formatDate(dateStr: string) {
  const [year, month, day] = dateStr.split('-').map(Number)
  const d = new Date(year, month - 1, day)
  return d.toLocaleDateString('nb-NO', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function EventDayPage({ params }: { params: Promise<{ date: string }> }) {
  const { date } = await params
  const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(date)

  let events: EventData[] = []
  if (isValidDate) {
    try {
      events = await client.fetch(eventsByDateQuery, { date })
    } catch (err) {
      console.error('[events/[date] page] fetch error:', err)
    }
  }

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <Link href="/events" style={{ color: 'var(--teal)', fontSize: '0.85rem', fontWeight: 600 }}>
            ← Tilbake til kalenderen
          </Link>
          <span className="label" style={{ display: 'block', marginTop: 16 }}>Events</span>
          <h1 style={{ marginTop: 12, textTransform: 'capitalize' }}>
            {isValidDate ? formatDate(date) : date}
          </h1>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {events.length === 0 ? (
            <p style={{ color: 'var(--text-muted)' }}>Ingen arrangementer denne dagen.</p>
          ) : (
            <div className="grid-2">
              {events.map(ev => {
                const Tag = ev.link ? 'a' : 'div'
                return (
                  <Tag
                    key={ev._id}
                    className="card"
                    style={{ display: 'block', color: 'inherit', textDecoration: 'none' }}
                    {...(ev.link ? { href: ev.link, target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    <div className="card-body">
                      {ev.source && (
                        <span className="tag" style={{ marginBottom: 8 }}>{ev.source}</span>
                      )}
                      <h3>{ev.title}</h3>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: 4 }}>
                        {[ev.location, ev.city].filter(Boolean).join(' · ')}
                      </p>
                      {ev.description && (
                        <p style={{ marginTop: 12 }}>{ev.description}</p>
                      )}
                    </div>
                  </Tag>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
