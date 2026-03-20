'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/context/LanguageContext'

export default function AboutPage() {
  const { t } = useLanguage()
  const a = t.about
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="label">{a.label}</span>
          <h1>{a.h1Line1}<br />{a.h1Line2}</h1>
          <p className="lead" style={{ marginTop: 12 }}>
            {a.lead}
          </p>
        </div>
      </div>

      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="about-teaser">
            <div className="about-teaser-img">
              <Image src="/bess.jpg" alt="Bess Olluri" width={400} height={500} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
              <div className="name-badge">
                <strong>Bess Olluri</strong>
                <span>{a.nameTagline}</span>
              </div>
            </div>
            <div>
              <span className="label">{a.myStory}</span>
              <h2>{a.h2Line1}<br />{a.h2Line2}</h2>
              <div className="divider" />
              <p className="lead">{a.bio1}</p>
              <p style={{ marginTop: 12 }}>{a.bio2}</p>
              <p style={{ marginTop: 12 }}>{a.bio3}</p>
              <div className="about-values" style={{ marginTop: 'var(--gap-md)' }}>
                {a.values.map(v => (
                  <div key={v.title} className="value-item">
                    <div className="value-icon">{v.icon}</div>
                    <div><h5>{v.title}</h5><p>{v.text}</p></div>
                  </div>
                ))}
              </div>
              <Link href="/contact" className="btn btn-primary mt-md">{a.workWithMe}</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container text-center">
          <span className="label">{a.byNumbers}</span>
          <h2>{a.yearsH2}</h2>
          <div className="grid-3" style={{ marginTop: 'var(--gap-md)', maxWidth: 700, margin: 'var(--gap-md) auto 0' }}>
            {a.stats.map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <h2 style={{ fontSize: '3rem', marginBottom: 4 }}>{s.value}</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
