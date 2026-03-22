'use client'
import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()
  const [email, setEmail] = useState('')

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo"><span>_</span>sidelengs</div>
            <p>{t.footer.tagline}</p>
          </div>
          <div className="footer-col">
            <h5>SOME</h5>
            <ul>
              <li><a href="#">LinkedIn</a></li>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">TikTok</a></li>
              <li><a href="#">YouTube</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>{t.footer.contact}</h5>
            <ul>
              <li><a href="mailto:hello@bess.no">hello@bess.no</a></li>
              <li><span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Oslo, Norway</span></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Nyhetsbrev</h5>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', marginBottom: 12 }}>
              Få de beste startup-historiene rett i innboksen.
            </p>
            <form onSubmit={e => { e.preventDefault(); setEmail('') }} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="din@epost.no"
                required
                style={{
                  padding: '8px 12px',
                  borderRadius: 6,
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.08)',
                  color: 'white',
                  fontSize: '0.85rem',
                  outline: 'none',
                }}
              />
              <button type="submit" className="btn btn-teal" style={{ padding: '8px 16px', justifyContent: 'center', fontSize: '0.85rem' }}>
                Abonner
              </button>
            </form>
          </div>
          <div className="footer-col">
            <h5>Discord</h5>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', marginBottom: 12 }}>
              Bli med i samtalen om norsk startup-kultur.
            </p>
            <a
              href="#"
              className="btn btn-outline-white"
              style={{ padding: '8px 16px', fontSize: '0.85rem', display: 'inline-flex', justifyContent: 'center' }}
            >
              Bli med på Discord
            </a>
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
