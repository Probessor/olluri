'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { client } from '@/sanity/lib/client'
import { postsQuery, siteSettingsQuery } from '@/sanity/lib/queries'
import { BlogCardSmall, type PostData } from '@/components/BlogCard'
import { useBlogStats } from '@/lib/useBlogStats'

const SHOW_SOCIAL = false

interface BizStatsRow {
  current?: string
  previous?: string
  change?: string
}

interface SiteSettings {
  businessStats?: { newRegistrations?: BizStatsRow; closures?: BizStatsRow }
}

export default function Home() {
  const { t } = useLanguage()
  const h = t.home
  const [posts, setPosts] = useState<PostData[]>([])
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const blogStats = useBlogStats()
  const stats = h.stats.map((s, i) => {
    if (i === 0 && blogStats) return { ...s, value: String(blogStats.startupCount) }
    if (i === 1 && blogStats) return { ...s, value: String(blogStats.founderCount) }
    return s
  })

  const newReg = siteSettings?.businessStats?.newRegistrations
  const closures = siteSettings?.businessStats?.closures
  const hasBizStats = !!(newReg?.current || newReg?.previous || newReg?.change || closures?.current || closures?.previous || closures?.change)

  const scroll = (dir: 'prev' | 'next') => {
    if (!trackRef.current) return
    const amount = trackRef.current.offsetWidth
    trackRef.current.scrollBy({ left: dir === 'next' ? amount : -amount, behavior: 'smooth' })
  }

  useEffect(() => {
    client.fetch(postsQuery)
      .then((data: PostData[]) => { if (data?.length) setPosts(data) })
      .catch(() => {})
  }, [])

  useEffect(() => {
    client.fetch(siteSettingsQuery)
      .then((data: SiteSettings) => setSiteSettings(data))
      .catch(() => {})
  }, [])

  return (
    <>
      {/* Hero */}
      <div className="page-hero" style={{ paddingTop: 'calc(var(--nav-height) + var(--gap-md))', paddingBottom: 'var(--gap-md)' }}>
        <div className="container">
          <span className="label">{h.label}</span>
          <h1 style={{ marginTop: 12 }}>
            {h.h1Line1}
          </h1>
          <p className="lead" style={{ marginTop: 16, maxWidth: 560 }}>{h.lead}</p>
        </div>
      </div>

      {/* Latest insights */}
      {posts.length > 0 && (
        <section style={{ padding: 'var(--gap-md) 0', background: 'var(--white)' }}>
          <div className="container">
            <div className="section-header-row">
              <div>
                <span className="label">{h.insightsLabel}</span>
                <h2>{h.insightsH2}</h2>
              </div>
              <Link href="/blog" className="btn btn-outline">{h.insightsLinkLabel} →</Link>
            </div>
            <div className="carousel-wrapper">
              <button className="carousel-btn carousel-btn-prev" onClick={() => scroll('prev')}>‹</button>
              <div className="carousel-track" ref={trackRef}>
                {posts.map(post => <BlogCardSmall key={post._id} post={post} />)}
              </div>
              <button className="carousel-btn carousel-btn-next" onClick={() => scroll('next')}>›</button>
            </div>
          </div>
        </section>
      )}

      {/* Partners & Sponsors */}
      <section className="section-sm">
        <div className="container">
          <span className="label">{h.partnersLabel}</span>
          <div style={{ marginTop: 'var(--gap-md)', textAlign: 'center' }}>
            <p style={{ color: 'var(--text-muted)', marginBottom: 'var(--gap-sm)' }}>{h.partnersEmpty}</p>
            <p style={{ color: 'var(--text-mid)' }}>
              {h.partnersCta}{' '}
              <Link href="/contact" style={{ color: 'var(--teal)', fontWeight: 600 }}>{h.partnersCtaLink} →</Link>
            </p>
          </div>
        </div>
      </section>

      {/* Social media — temporarily hidden; flip SHOW_SOCIAL to bring it back */}
      {SHOW_SOCIAL && (
        <section className="section-sm">
          <div className="container">
            <div className="section-header-row">
              <div>
                <span className="label">{h.socialLabel}</span>
                <h2>{h.socialH2}</h2>
              </div>
              <a href="#" className="btn btn-outline" style={{ gap: 8 }}>
                <span>📸</span>{h.socialInstagram}
              </a>
            </div>
            <div style={{ marginTop: 'var(--gap-md)', textAlign: 'center', padding: 'var(--gap-lg) 0' }}>
              <p style={{ color: 'var(--text-muted)' }}>{h.socialEmpty}</p>
            </div>
          </div>
        </section>
      )}

      {/* Stats */}
      <section className="section">
        <div className="container text-center">
          <span className="label">{h.statsLabel}</span>
          <h2 style={{ marginTop: 8 }}>{h.statsH2}</h2>
          <div className="grid-3" style={{ marginTop: 'var(--gap-md)', maxWidth: 700, margin: 'var(--gap-md) auto 0' }}>
            {stats.map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <h2 style={{ fontSize: '3rem', marginBottom: 4 }}>{s.value}</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business stats (new registrations / closures) */}
      {hasBizStats && (
        <div className="container" style={{ marginBottom: 'var(--gap-lg)' }}>
          <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius)', padding: 'var(--gap-md)', maxWidth: 900, margin: '0 auto' }}>
            <div className="grid-3" style={{ gap: 'var(--gap-md)' }}>
              {[newReg?.current, newReg?.previous, newReg?.change].map((val, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <h3 style={{ fontSize: '1.8rem', marginBottom: 4 }}>{val || '—'}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{h.bizStats.newRegistrations[i]}</p>
                </div>
              ))}
            </div>
            <div className="divider" style={{ margin: 'var(--gap-md) 0' }} />
            <div className="grid-3" style={{ gap: 'var(--gap-md)' }}>
              {[closures?.current, closures?.previous, closures?.change].map((val, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <h3 style={{ fontSize: '1.8rem', marginBottom: 4 }}>{val || '—'}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{h.bizStats.closures[i]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="container">
        <div className="cta-section">
          <span className="label" style={{ color: 'var(--teal)' }}>{h.ctaLabel}</span>
          <h2>{h.ctaH2}</h2>
          <p>{h.ctaP}</p>
          <div className="flex gap-sm" style={{ justifyContent: 'center' }}>
            <Link href="/contact" className="btn btn-teal">{h.ctaBtn}</Link>
          </div>
        </div>
      </div>
    </>
  )
}
