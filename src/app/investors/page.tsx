'use client'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'

export default function InvestorsPage() {
  const { t } = useLanguage()
  const inv = t.investors

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="label">{inv.label}</span>
          <h1>{inv.h1}</h1>
          <p className="lead" style={{ marginTop: 12 }}>
            {inv.lead}
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="section-header-row">
            <div>
              <span className="label">{inv.offeringsLabel}</span>
              <h2>{inv.offeringsH2}</h2>
            </div>
          </div>
          <div className="grid-2" style={{ marginTop: 'var(--gap-md)' }}>
            {inv.offerings.map((item, i) => (
              <div key={item.title} className="service-preview-card">
                <div className={`service-icon ${['service-icon-teal', 'service-icon-warm', 'service-icon-surf', 'service-icon-navy'][i % 4]}`}>{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container">
        <div className="cta-section">
          <span className="label" style={{ color: 'var(--teal)' }}>{inv.ctaLabel}</span>
          <h2>{inv.ctaH2}</h2>
          <p>{inv.ctaP}</p>
          <div className="flex gap-sm" style={{ justifyContent: 'center' }}>
            <Link href="/contact" className="btn btn-teal">{inv.ctaBtn}</Link>
          </div>
        </div>
      </div>
    </>
  )
}
