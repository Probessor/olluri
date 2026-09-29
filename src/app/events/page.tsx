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

const SOURCE_TAG_CLASSES: Record<string, string> = {
  OIW: 'tag-lime',
  Mesh: 'tag-yellow',
  StartupLab: 'tag-red-light',
  Snartup: 'tag-teal',
  '6AM': 'tag-black',
}

function PillFilter({ options, active, onSelect, colorMap }: { options: string[]; active: string | null; onSelect: (v: string | null) => void; colorMap?: Record<string, string> }) {
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
      {options.map(opt => {
        const isActive = active === opt
        const colorClass = colorMap?.[opt]
        const className = colorClass
          ? `tag ${colorClass}${isActive ? ' tag-selected' : ''}`
          : (isActive ? 'tag' : 'tag tag-surface')
        return (
          <button
            key={opt}
            onClick={() => onSelect(isActive ? null : opt)}
            className={className}
            style={{ cursor: 'pointer', border: 'none', fontFamily: 'inherit' }}
          >
            {opt}
          </button>
        )
      })}
    </div>
  )
}

export default function EventsPage() {
  const { t } = useLanguage()
  const e = t.events
  const [events, setEvents] = useState<EventData[]>([])
  const [activeCity, setActiveCity] = useState<string | null>('Oslo')
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
      <section className="section" style={{ paddingTop: 'calc(var(--nav-height) + var(--gap-md))' }}>
        <div className="container">
          <h1>{e.h1}</h1>
          <p className="lead" style={{ marginTop: 8, marginBottom: 'var(--gap-md)' }}>{e.lead}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'center', marginBottom: 'var(--gap-md)' }}>
            <PillFilter options={cities} active={activeCity} onSelect={setActiveCity} />
            <PillFilter options={sources} active={activeSource} onSelect={setActiveSource} colorMap={SOURCE_TAG_CLASSES} />
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

          <EventCalendar events={filtered} />
        </div>
      </section>
    </>
  )
}
