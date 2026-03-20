'use client'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'

export default function PodcastPage() {
  const { t } = useLanguage()
  const p = t.podcast

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="label">{p.label}</span>
          <h1>{p.h1}</h1>
          <p className="lead" style={{ marginTop: 12 }}>{p.lead}</p>
        </div>
      </div>

      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="section-header-row">
            <div>
              <span className="label">{p.episodesLabel}</span>
              <h2>{p.episodesH2}</h2>
            </div>
          </div>
          <div style={{ marginTop: 'var(--gap-md)', textAlign: 'center', padding: 'var(--gap-lg) 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: 16 }}>🎙️</div>
            <h3>{p.comingSoon}</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: 8 }}>{p.comingSoonText}</p>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="cta-section">
          <span className="label" style={{ color: 'var(--teal)' }}>{p.ctaLabel}</span>
          <h2>{p.ctaH2}</h2>
          <p>{p.ctaP}</p>
          <div className="flex gap-sm" style={{ justifyContent: 'center' }}>
            <Link href="/contact" className="btn btn-teal">{p.ctaBtn}</Link>
          </div>
        </div>
      </div>
    </>
  )
}
