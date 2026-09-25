'use client'
import { useEffect, useMemo, useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { client } from '@/sanity/lib/client'
import { eventsQuery } from '@/sanity/lib/queries'
import EventCalendar from '@/components/EventCalendar'

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

function PillFilter({ options, active, onSelect }: { options: string[]; active: string | null; onSelect: (v: string | null) => void }) {
  if (options.length < 2) return null
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <button
        onClick={() => onSelect(null)}
        className={active === null ? 'tag' : 'tag tag-surface'}
        style={{ cursor: 'pointer', border: 'none', fontFamily: 'inherit' }}
      >
        Alle
      </button>
      {options.map(opt => (
        <button
          key={opt}
          onClick={() => onSelect(active === opt ? null : opt)}
          className={active === opt ? 'tag' : 'tag tag-surface'}
          style={{ cursor: 'pointer', border: 'none', fontFamily: 'inherit' }}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}

export default function EventsPage() {
  const { t } = useLanguage()
  const e = t.events
  const [events, setEvents] = useState<EventData[]>([])
  const [activeCity, setActiveCity] = useState<string | null>(null)
  const [activeSource, setActiveSource] = useState<string | null>(null)

  useEffect(() => {
    client.fetch(eventsQuery)
      .then((data: EventData[]) => setEvents(data ?? []))
      .catch(() => {})
  }, [])

  const cities = useMemo(() => {
    return Array.from(new Set(events.map(ev => ev.city).filter(Boolean) as string[])).sort((a, b) => a.localeCompare(b, 'no'))
  }, [events])

  const sources = useMemo(() => {
    return Array.from(new Set(events.map(ev => ev.source).filter(Boolean) as string[])).sort((a, b) => a.localeCompare(b, 'no'))
  }, [events])

  const filtered = useMemo(() => {
    return events.filter(ev =>
      (!activeCity || ev.city === activeCity) &&
      (!activeSource || ev.source === activeSource)
    )
  }, [events, activeCity, activeSource])

  const isFiltering = !!activeCity || !!activeSource

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="label">{e.label}</span>
          <h1>{e.h1}</h1>
          <p className="lead" style={{ marginTop: 12 }}>{e.lead}</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {events.length === 0 ? (
            <p style={{ color: 'var(--text-muted)' }}>{e.empty}</p>
          ) : (
            <>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'center', marginBottom: 'var(--gap-md)' }}>
                <PillFilter options={cities} active={activeCity} onSelect={setActiveCity} />
                <PillFilter options={sources} active={activeSource} onSelect={setActiveSource} />
                {isFiltering && (
                  <button
                    onClick={() => { setActiveCity(null); setActiveSource(null) }}
                    style={{
                      padding: '8px 14px', borderRadius: 'var(--radius-sm)',
                      border: '1.5px solid var(--border)',
                      background: 'none', color: 'var(--text-muted)',
                      fontSize: '0.85rem', fontFamily: 'inherit', cursor: 'pointer',
                      fontWeight: 500,
                    }}
                  >
                    ✕ Nullstill filter
                  </button>
                )}
              </div>

              {filtered.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', padding: 'var(--gap-lg) 0', textAlign: 'center' }}>
                  Ingen arrangementer matcher filteret.
                </p>
              ) : (
                <EventCalendar events={filtered} />
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}
