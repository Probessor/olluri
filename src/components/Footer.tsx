'use client'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">Bess<span>.</span></div>
            <p>{t.footer.tagline}</p>
          </div>
          <div className="footer-col">
            <h5>{t.footer.navigate}</h5>
            <ul>
              <li><Link href="/">{t.nav.home}</Link></li>
              <li><Link href="/services">{t.nav.services}</Link></li>
              <li><Link href="/about">{t.nav.about}</Link></li>
              <li><Link href="/blog">{t.nav.insights}</Link></li>
              <li><Link href="/contact">{t.nav.contact}</Link></li>
            </ul>
          </div>
<div className="footer-col">
            <h5>{t.footer.contact}</h5>
            <ul>
              <li><a href="mailto:hello@bess.no">hello@bess.no</a></li>
              <li><a href="#">LinkedIn</a></li>
              <li><span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Oslo, Norway</span></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>{t.footer.copyright}</p>
          <div className="social-links">
            <a href="#" className="social-link" aria-label="LinkedIn">in</a>
            <a href="mailto:hello@bess.no" className="social-link" aria-label="Email">✉</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
