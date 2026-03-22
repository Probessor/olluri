'use client'
import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import { client } from '@/sanity/lib/client'
import { postsQuery } from '@/sanity/lib/queries'
import { BlogCardFeatured, BlogCardSmall, type PostData } from '@/components/BlogCard'
import { useLanguage } from '@/context/LanguageContext'
import { FALLBACK_POSTS } from '@/lib/fallbackPosts'

export default function BlogPage() {
  const { t } = useLanguage()
  const b = t.blog
  const [posts, setPosts] = useState<PostData[]>(FALLBACK_POSTS)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [tagDropdownOpen, setTagDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    client.fetch(postsQuery)
      .then((data: PostData[]) => { if (data?.length) setPosts(data) })
      .catch(() => {})
  }, [])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setTagDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const categories = useMemo(() => {
    const cats = posts.map(p => p.category).filter(Boolean) as string[]
    return Array.from(new Set(cats))
  }, [posts])

  const tags = useMemo(() => {
    const counts: Record<string, number> = {}
    posts.forEach(p => p.tags?.forEach(tag => { counts[tag] = (counts[tag] ?? 0) + 1 }))
    return Object.entries(counts).sort(([a], [b]) => a.localeCompare(b, 'no'))
  }, [posts])

  const filtered = useMemo(() => {
    return posts.filter(p => {
      const matchesCategory = !activeCategory || p.category === activeCategory
      const matchesTag = !activeTag || p.tags?.includes(activeTag)
      const query = search.toLowerCase()
      const matchesSearch = !query ||
        p.title.toLowerCase().includes(query) ||
        p.excerpt?.toLowerCase().includes(query)
      return matchesCategory && matchesTag && matchesSearch
    })
  }, [posts, search, activeCategory, activeTag])

  const isFiltering = !!search || !!activeCategory || !!activeTag
  const [featured, ...rest] = filtered

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="label">{b.label}</span>
          <h1>{b.h1}</h1>
          <p className="lead" style={{ marginTop: 12 }}>{b.lead}</p>
        </div>
      </div>

      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">

          {/* Search + filters */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', marginBottom: 'var(--gap-md)' }}>

            {/* Search bar */}
            <div style={{ position: 'relative', flex: '1 1 240px', maxWidth: 340 }}>
              <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }}>🔍</span>
              <input
                type="search"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Søk i artikler…"
                style={{
                  width: '100%',
                  padding: '10px 12px 10px 36px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1.5px solid var(--border)',
                  fontSize: '0.9rem',
                  fontFamily: 'inherit',
                  outline: 'none',
                  background: 'var(--bg)',
                  color: 'var(--text)',
                }}
              />
            </div>

            {/* Category pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              <button
                onClick={() => setActiveCategory(null)}
                className={activeCategory === null ? 'tag' : 'tag tag-surface'}
                style={{ cursor: 'pointer', border: 'none', fontFamily: 'inherit' }}
              >
                Alle
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                  className={activeCategory === cat ? 'tag' : 'tag tag-surface'}
                  style={{ cursor: 'pointer', border: 'none', fontFamily: 'inherit' }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Tag dropdown */}
            {tags.length > 0 && (
              <div ref={dropdownRef} style={{ position: 'relative' }}>
                <button
                  onClick={() => setTagDropdownOpen(o => !o)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '8px 14px', borderRadius: 'var(--radius-sm)',
                    border: '1.5px solid var(--border)',
                    background: activeTag ? 'var(--primary)' : 'var(--bg)',
                    color: activeTag ? 'white' : 'var(--text-mid)',
                    fontSize: '0.85rem', fontFamily: 'inherit', cursor: 'pointer',
                    fontWeight: 500,
                  }}
                >
                  {activeTag ?? 'Tagger'} <span style={{ fontSize: '0.7rem' }}>▾</span>
                </button>
                {tagDropdownOpen && (
                  <div style={{
                    position: 'absolute', top: 'calc(100% + 6px)', left: 0,
                    background: 'var(--white)', border: '1px solid var(--border-light)',
                    borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)',
                    minWidth: 160, zIndex: 10, padding: '6px 0',
                  }}>
                    <button
                      onClick={() => { setActiveTag(null); setTagDropdownOpen(false) }}
                      style={{
                        display: 'block', width: '100%', textAlign: 'left',
                        padding: '9px 16px', fontSize: '0.88rem', fontFamily: 'inherit',
                        background: !activeTag ? 'var(--surface)' : 'none',
                        color: 'var(--text-mid)', border: 'none', cursor: 'pointer',
                      }}
                    >
                      Alle tagger
                    </button>
                    {tags.map(([tag, count]) => (
                      <button
                        key={tag}
                        onClick={() => { setActiveTag(tag); setTagDropdownOpen(false) }}
                        style={{
                          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                          width: '100%', textAlign: 'left',
                          padding: '9px 16px', fontSize: '0.88rem', fontFamily: 'inherit',
                          background: activeTag === tag ? 'var(--surface)' : 'none',
                          color: activeTag === tag ? 'var(--primary)' : 'var(--text-mid)',
                          border: 'none', cursor: 'pointer', fontWeight: activeTag === tag ? 600 : 400,
                          gap: 8,
                        }}
                      >
                        <span>{tag}</span>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 400 }}>({count})</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Clear filters */}
            {isFiltering && (
              <button
                onClick={() => { setSearch(''); setActiveCategory(null); setActiveTag(null) }}
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

          {filtered.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', padding: 'var(--gap-lg) 0', textAlign: 'center' }}>
              Ingen artikler matcher søket ditt.
            </p>
          ) : isFiltering ? (
            <div className="grid-3">
              {filtered.map(post => <BlogCardSmall key={post._id} post={post} />)}
            </div>
          ) : (
            <>
              <div className="section-header-row">
                <div><span className="label">{b.latestLabel}</span><h2>{b.latestH2}</h2></div>
              </div>
              {featured && <BlogCardFeatured post={featured} />}
              <div className="grid-3" style={{ marginTop: 'var(--gap-md)' }}>
                {rest.map(post => <BlogCardSmall key={post._id} post={post} />)}
              </div>
            </>
          )}

        </div>
      </section>

      <div className="container">
        <div className="cta-section">
          <span className="label" style={{ color: 'var(--teal)' }}>{b.ctaLabel}</span>
          <h2>{b.ctaH2Line1}<br />{b.ctaH2Line2}</h2>
          <p>{b.ctaP}</p>
          <div className="flex gap-sm" style={{ justifyContent: 'center' }}>
            <Link href="/contact" className="btn btn-teal">{b.subscribe}</Link>
          </div>
        </div>
      </div>
    </>
  )
}
