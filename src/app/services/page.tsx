'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { client } from '@/sanity/lib/client'
import { servicesQuery } from '@/sanity/lib/queries'
import ServiceCard, { type ServiceData } from '@/components/ServiceCard'
import { useLanguage } from '@/context/LanguageContext'

export default function ServicesPage() {
  const { t } = useLanguage()
  const s = t.services
  const [services, setServices] = useState<ServiceData[]>([])

  useEffect(() => {
    client.fetch(servicesQuery)
      .then((data: ServiceData[]) => { if (data?.length) setServices(data) })
      .catch(() => {})
  }, [])

  const displayServices = services.length > 0 ? services : s.fallback

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="label">{s.label}</span>
          <h1>{s.h1}</h1>
          <p className="lead" style={{ marginTop: 12 }}>
            {s.lead}
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="grid-3">
            {displayServices.map((svc, i) => <ServiceCard key={svc._id} service={svc} index={i} />)}
          </div>
        </div>
      </section>

      <div className="container">
        <div className="cta-section">
          <span className="label" style={{ color: 'var(--teal)' }}>{s.ctaLabel}</span>
          <h2>{s.ctaH2}</h2>
          <p>{s.ctaP}</p>
          <div className="flex gap-sm" style={{ justifyContent: 'center' }}>
            <Link href="/contact" className="btn btn-teal">{s.ctaBtn}</Link>
          </div>
        </div>
      </div>
    </>
  )
}
