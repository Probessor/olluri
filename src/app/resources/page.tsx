'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { client } from '@/sanity/lib/client'
import { resourcesQuery } from '@/sanity/lib/queries'

interface ResourceItem {
  _id: string
  title: string
  description?: string
  url: string
  icon?: string
  category: string
  order?: number
}

const CATEGORY_ORDER = ['Funding', 'Entreprenørskap', 'Problemløsing', 'Maler og dokumenter', 'Annet']
const ICON_CLASSES = ['service-icon-teal', 'service-icon-warm', 'service-icon-surf', 'service-icon-navy']

export default function ResourcesPage() {
  const { t } = useLanguage()
  const r = t.resources
  const [resources, setResources] = useState<ResourceItem[]>([])

  useEffect(() => {
    client.fetch(resourcesQuery)
      .then((data: ResourceItem[]) => { if (data?.length) setResources(data) })
      .catch(() => {})
  }, [])

  const groups = CATEGORY_ORDER
    .map(category => ({ category, items: resources.filter(item => item.category === category) }))
    .filter(group => group.items.length > 0)

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="label">{r.label}</span>
          <h1>{r.h1}</h1>
          <p className="lead" style={{ marginTop: 12 }}>
            {r.lead}
          </p>
        </div>
      </div>

      {groups.map((group, gi) => (
        <section className="section" style={gi > 0 ? { paddingTop: 0 } : undefined} key={group.category}>
          <div className="container">
            <div className="section-header-row">
              <div>
                <h2>{group.category}</h2>
              </div>
            </div>
            <div className="grid-2" style={{ marginTop: 'var(--gap-md)' }}>
              {group.items.map((item, i) => (
                <a
                  key={item._id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="service-preview-card"
                  style={{ display: 'block' }}
                >
                  <div className={`service-icon ${ICON_CLASSES[i % ICON_CLASSES.length]}`}>{item.icon || '🔗'}</div>
                  <h3>{item.title}</h3>
                  {item.description && <p>{item.description}</p>}
                </a>
              ))}
            </div>
          </div>
        </section>
      ))}

      <div className="container">
        <div className="cta-section">
          <span className="label" style={{ color: 'var(--teal)' }}>{r.ctaLabel}</span>
          <h2>{r.ctaH2}</h2>
          <p>{r.ctaP}</p>
          <div className="flex gap-sm" style={{ justifyContent: 'center' }}>
            <Link href="/contact" className="btn btn-teal">{r.ctaBtn}</Link>
          </div>
        </div>
      </div>
    </>
  )
}
