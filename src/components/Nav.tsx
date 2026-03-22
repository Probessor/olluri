'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'

export default function Nav() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { lang, t, toggle } = useLanguage()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const links = [
    { href: '/', label: t.nav.home },
    { href: '/about', label: t.nav.about },
    { href: '/blog', label: t.nav.insights },
  ]

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}${open ? ' open' : ''}`}>
      <div className="nav-inner">
        <Link href="/" className="nav-logo"><span>_</span>sidelengs</Link>
        <ul className="nav-links">
          <li key="home">
            <Link href="/" className={pathname === '/' ? 'active' : ''}>{t.nav.home}</Link>
          </li>
          <li key="blog">
            <Link href="/blog" className={pathname === '/blog' ? 'active' : ''}>{t.nav.insights}</Link>
          </li>
<li key="podcast">
            <Link href="/podcast" className={pathname === '/podcast' ? 'active' : ''}>{t.nav.podcast}</Link>
          </li>
          <li key="about">
            <Link href="/about" className={pathname === '/about' ? 'active' : ''}>{t.nav.about}</Link>
          </li>
        </ul>
        <div className="nav-cta">
          <button
            onClick={toggle}
            aria-label="Toggle language"
            style={{
              background: 'none',
              border: '1px solid rgba(255,255,255,0.5)',
              borderRadius: 6,
              padding: '6px 12px',
              cursor: 'pointer',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              color: 'rgba(255,255,255,0.85)',
              lineHeight: 1,
            }}
          >
            {lang === 'no' ? 'EN' : 'NO'}
          </button>
          <Link href="/contact" className="btn btn-outline-white" style={{ padding: '9px 20px' }}>{t.nav.workWithMe}</Link>
        </div>
        <button
          className="nav-toggle"
          aria-label="Toggle menu"
          onClick={() => setOpen(o => !o)}
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}
