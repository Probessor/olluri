'use client'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/context/LanguageContext'

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

function dateKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

const MAX_VISIBLE = 3

export default function EventCalendar({ events }: { events: EventData[] }) {
  const { lang } = useLanguage()
  const router = useRouter()
  const [month, setMonth] = useState(() => {
    const d = new Date()
    return new Date(d.getFullYear(), d.getMonth(), 1)
  })

  const locale = lang === 'no' ? 'nb-NO' : 'en-GB'
  const year = month.getFullYear()
  const monthIdx = month.getMonth()

  const eventsByDay = useMemo(() => {
    const map = new Map<string, EventData[]>()
    events.forEach(ev => {
      if (!ev.date) return
      const list = map.get(dateKey(new Date(ev.date))) ?? []
      list.push(ev)
      map.set(dateKey(new Date(ev.date)), list)
    })
    return map
  }, [events])

  const monthLabel = month.toLocaleDateString(locale, { month: 'long', year: 'numeric' })
  const weekdayFmt = new Intl.DateTimeFormat(locale, { weekday: 'short' })
  const weekdays = Array.from({ length: 7 }, (_, i) => weekdayFmt.format(new Date(2024, 0, i + 1)))

  const startOffset = (new Date(year, monthIdx, 1).getDay() + 6) % 7 // Monday-first
  const daysInMonth = new Date(year, monthIdx + 1, 0).getDate()
  const totalCells = Math.ceil((startOffset + daysInMonth) / 7) * 7

  const today = new Date()

  const cells = Array.from({ length: totalCells }, (_, i) => {
    const date = new Date(year, monthIdx, i - startOffset + 1)
    return {
      date,
      inMonth: date.getMonth() === monthIdx,
      isToday: date.toDateString() === today.toDateString(),
    }
  })

  const goToday = () => setMonth(new Date(today.getFullYear(), today.getMonth(), 1))

  return (
    <div className="event-calendar">
      <div className="event-calendar-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={() => setMonth(m => new Date(m.getFullYear(), m.getMonth() - 1, 1))}
            aria-label="Previous month"
            className="event-calendar-nav"
          >‹</button>
          <h2 style={{ textTransform: 'capitalize', fontSize: '1.4rem', minWidth: 220, textAlign: 'center' }}>{monthLabel}</h2>
          <button
            onClick={() => setMonth(m => new Date(m.getFullYear(), m.getMonth() + 1, 1))}
            aria-label="Next month"
            className="event-calendar-nav"
          >›</button>
        </div>
        <button onClick={goToday} className="event-calendar-today">
          {lang === 'no' ? 'I dag' : 'Today'}
        </button>
      </div>

      <div className="event-calendar-weekdays">
        {weekdays.map((w, i) => <span key={i}>{w}</span>)}
      </div>

      <div className="event-calendar-grid">
        {cells.map(({ date, inMonth, isToday }) => {
          const key = dateKey(date)
          const dayEvents = eventsByDay.get(key) ?? []
          const visible = dayEvents.slice(0, MAX_VISIBLE)
          const hidden = dayEvents.length - visible.length

          const hasEvents = dayEvents.length > 0
          const goToDay = () => { if (hasEvents) router.push(`/events/${key}`) }

          return (
            <div
              key={key}
              className={`event-calendar-cell${inMonth ? '' : ' is-outside'}${isToday ? ' is-today' : ''}${hasEvents ? ' is-clickable' : ''}`}
              role={hasEvents ? 'button' : undefined}
              tabIndex={hasEvents ? 0 : undefined}
              onClick={goToDay}
              onKeyDown={hasEvents ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goToDay() } } : undefined}
            >
              <span className="event-calendar-daynum">{date.getDate()}</span>
              {hasEvents && (
                <div className="event-calendar-events">
                  {visible.map(ev => {
                    const Tag = ev.link ? 'a' : 'div'
                    return (
                      <Tag
                        key={ev._id}
                        className="event-chip"
                        title={[ev.title, ev.location].filter(Boolean).join(' · ')}
                        onClick={(e) => e.stopPropagation()}
                        {...(ev.link ? { href: ev.link, target: '_blank', rel: 'noopener noreferrer' } : {})}
                      >
                        {ev.title}
                      </Tag>
                    )
                  })}
                  {hidden > 0 && (
                    <span className="event-chip-more">+{hidden} {lang === 'no' ? 'til' : 'more'}</span>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
