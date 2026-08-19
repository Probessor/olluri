'use client'
import { useEffect, useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { client } from '@/sanity/lib/client'
import { eventsQuery } from '@/sanity/lib/queries'
import EventCalendar from '@/components/EventCalendar'

type EventData = {
  _id: string
  title: string
  date?: string
  location?: string
  description?: string
  link?: string
}

function formatDate(iso?: string) {
  if (!iso) return null
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function EventsPage() {
  const { t } = useLanguage()
  const e = t.events
  const [events, setEvents] = useState<EventData[]>([])

  useEffect(() => {
    client.fetch(eventsQuery)
      .then((data: EventData[]) => setEvents(data ?? []))
      .catch(() => {})
  }, [])

  return (
    <>
      <div className="page-hero" style={{ paddingTop: 'calc(var(--nav-height) + var(--gap-md))', paddingBottom: 'var(--gap-md)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--gap-md)', flexWrap: 'wrap' }}>
          <div>
            <span className="label">{e.label}</span>
            <h1 style={{ marginTop: 12 }}>{e.h1}</h1>
            <p className="lead" style={{ marginTop: 16, maxWidth: 560 }}>{e.lead}</p>
          </div>
          <EventCalendar events={events} />
        </div>
      </div>

      <section className="section">
        <div className="container">
          {events.length === 0 ? (
            <p style={{ color: 'var(--text-muted)' }}>{e.empty}</p>
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
                      <h3>{ev.title}</h3>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: 4 }}>
                        {[formatDate(ev.date), ev.location].filter(Boolean).join(' · ')}
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
