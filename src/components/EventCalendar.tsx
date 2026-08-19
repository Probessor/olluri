'use client'
import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'

type EventData = {
  _id: string
  title: string
  date?: string
  location?: string
  link?: string
}

export default function EventCalendar({ events }: { events: EventData[] }) {
  const { lang } = useLanguage()
  const [month, setMonth] = useState(() => {
    const d = new Date()
    return new Date(d.getFullYear(), d.getMonth(), 1)
  })

  const locale = lang === 'no' ? 'nb-NO' : 'en-GB'
  const year = month.getFullYear()
  const monthIdx = month.getMonth()
  const daysInMonth = new Date(year, monthIdx + 1, 0).getDate()
  const startOffset = (new Date(year, monthIdx, 1).getDay() + 6) % 7 // Monday-first

  const eventsByDay = new Map<number, EventData[]>()
  events.forEach(ev => {
    if (!ev.link || !ev.date) return
    const d = new Date(ev.date)
    if (d.getFullYear() === year && d.getMonth() === monthIdx) {
      const list = eventsByDay.get(d.getDate()) ?? []
      list.push(ev)
      eventsByDay.set(d.getDate(), list)
    }
  })

  const monthLabel = month.toLocaleDateString(locale, { month: 'long', year: 'numeric' })
  const weekdayFmt = new Intl.DateTimeFormat(locale, { weekday: 'narrow' })
  const weekdays = Array.from({ length: 7 }, (_, i) => weekdayFmt.format(new Date(2024, 0, i + 1)))
  const cells: (number | null)[] = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  return (
    <div className="card" style={{ width: 280, flexShrink: 0, overflow: 'visible' }}>
      <div className="card-body">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <button
            onClick={() => setMonth(m => new Date(m.getFullYear(), m.getMonth() - 1, 1))}
            aria-label="Previous month"
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem', color: 'var(--text-mid)', lineHeight: 1 }}
          >‹</button>
          <span style={{ fontWeight: 700, fontSize: '0.85rem', textTransform: 'capitalize' }}>{monthLabel}</span>
          <button
            onClick={() => setMonth(m => new Date(m.getFullYear(), m.getMonth() + 1, 1))}
            aria-label="Next month"
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem', color: 'var(--text-mid)', lineHeight: 1 }}
          >›</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, textAlign: 'center' }}>
          {weekdays.map((w, i) => (
            <span key={`w${i}`} style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 700 }}>{w}</span>
          ))}
          {cells.map((day, i) => {
            if (day === null) return <span key={i} />
            const dayEvents = eventsByDay.get(day)
            if (!dayEvents?.length) {
              return (
                <span key={i} style={{ fontSize: '0.78rem', padding: '6px 0', color: 'var(--text-mid)' }}>{day}</span>
              )
            }
            return (
              <div key={i} className="calendar-day-wrap">
                <a
                  href={dayEvents[0].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: '0.78rem',
                    padding: '6px 0',
                    borderRadius: '50%',
                    background: 'var(--teal)',
                    color: '#fff',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'block',
                  }}
                >
                  {day}
                </a>
                <div className="calendar-tooltip">
                  {dayEvents.map(ev => (
                    <a key={ev._id} href={ev.link} target="_blank" rel="noopener noreferrer" className="calendar-tooltip-item">
                      <span className="calendar-tooltip-title">{ev.title}</span>
                      {ev.location && <span className="calendar-tooltip-location">{ev.location}</span>}
                    </a>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
