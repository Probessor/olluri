'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'

export default function Nav() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { lang, t, toggle } = useLanguage()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const isServicesActive = pathname === '/services' || pathname === '/investors'

  const links = [
    { href: '/', label: t.nav.home },
    { href: '/about', label: t.nav.about },
    { href: '/blog', label: t.nav.insights },
  ]

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}${open ? ' open' : ''}`}>
      <div className="nav-inner">
        <Link href="/" className="nav-logo">Bess<span>.</span></Link>
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

          <li
            className="nav-dropdown-wrapper"
            onMouseEnter={() => {
              if (closeTimer.current) clearTimeout(closeTimer.current)
              setDropdownOpen(true)
            }}
            onMouseLeave={() => {
              closeTimer.current = setTimeout(() => setDropdownOpen(false), 150)
            }}
          >
            <button
              className={`nav-dropdown-trigger${isServicesActive ? ' active' : ''}`}
              onClick={() => setDropdownOpen(o => !o)}
            >
              {lang === 'no' ? 'Tjenester' : 'Services'} <span className="nav-dropdown-arrow">▾</span>
            </button>
            {dropdownOpen && (
              <ul className="nav-dropdown">
                <li><Link href="/services" onClick={() => setDropdownOpen(false)}>{t.nav.services}</Link></li>
                <li><Link href="/investors" onClick={() => setDropdownOpen(false)}>{t.nav.investors}</Link></li>
              </ul>
            )}
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
              border: '1px solid currentColor',
              borderRadius: 6,
              padding: '6px 12px',
              cursor: 'pointer',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              opacity: 0.7,
              color: 'inherit',
              lineHeight: 1,
            }}
          >
            {lang === 'no' ? 'EN' : 'NO'}
          </button>
          <Link href="/contact" className="btn btn-primary" style={{ padding: '9px 20px' }}>{t.nav.workWithMe}</Link>
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
