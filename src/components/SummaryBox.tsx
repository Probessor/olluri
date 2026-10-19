'use client'
import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'

interface SummaryPoint {
  label: string
  text: string
}

export default function SummaryBox({ points }: { points: SummaryPoint[] }) {
  const { t } = useLanguage()
  const b = t.blog
  const [open, setOpen] = useState(false)

  if (!points || points.length === 0) return null

  const visible = open ? points : points.slice(0, 1)

  return (
    <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius)', padding: 'var(--gap-md)', margin: '0 0 var(--gap-md)' }}>
      <h3 style={{ fontSize: '1.1rem', marginBottom: 14 }}>{b.summaryTitle}</h3>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {visible.map((point, i) => (
          <li key={i} style={{ color: 'var(--text-mid)', lineHeight: 1.6 }}>
            <strong style={{ color: 'var(--text)' }}>{point.label}:</strong> {point.text}
          </li>
        ))}
      </ul>
      {points.length > 1 && (
        <button
          onClick={() => setOpen(o => !o)}
          style={{
            marginTop: 16,
            padding: '8px 18px',
            borderRadius: 100,
            border: 'none',
            background: 'var(--teal)',
            color: '#fff',
            fontSize: '0.85rem',
            fontWeight: 600,
            fontFamily: 'inherit',
            cursor: 'pointer',
          }}
        >
          {open ? b.showLess : b.showMore}
        </button>
      )}
    </div>
  )
}
