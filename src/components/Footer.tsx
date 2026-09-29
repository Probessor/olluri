'use client'
import { useLanguage } from '@/context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

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
              <li><a href="https://www.linkedin.com/in/besart-olluri/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a href="https://www.instagram.com/_sidelengs/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>{t.footer.contact}</h5>
            <ul>
              <li><a href="mailto:bess@sidelengs.com">bess@sidelengs.com</a></li>
              <li><span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Oslo, Norway</span></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>{t.footer.copyright}</p>
          <div className="social-links">
            <a href="https://www.linkedin.com/in/besart-olluri/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">in</a>
            <a href="mailto:bess@sidelengs.com" className="social-link" aria-label="Email">✉</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
