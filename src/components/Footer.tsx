import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">Bess<span>.</span></div>
            <p>Connecting Norway&apos;s best founders with the world&apos;s best investors, one introduction at a time.</p>
          </div>
          <div className="footer-col">
            <h5>Navigate</h5>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/blog">Insights</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Ecosystem</h5>
            <ul>
              <li><a href="#">StartupLab</a></li>
              <li><a href="#">Katapult</a></li>
              <li><a href="#">Mesh Oslo</a></li>
              <li><a href="#">Innovation Norway</a></li>
              <li><a href="#">Nordic Startup Awards</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Contact</h5>
            <ul>
              <li><a href="mailto:hello@bess.no">hello@bess.no</a></li>
              <li><a href="#">LinkedIn</a></li>
              <li><a href="#">Twitter / X</a></li>
              <li><span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Oslo, Norway</span></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Bess Andersen. Built with curiosity about Norwegian innovation.</p>
          <div className="social-links">
            <a href="#" className="social-link" aria-label="LinkedIn">in</a>
            <a href="#" className="social-link" aria-label="Twitter">𝕏</a>
            <a href="mailto:hello@bess.no" className="social-link" aria-label="Email">✉</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
