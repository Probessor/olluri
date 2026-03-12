export default function ContactPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="label">Get in touch</span>
          <h1>Let&apos;s talk</h1>
          <p className="lead" style={{ marginTop: 12 }}>
            Whether you&apos;re a founder looking for the right investor, or an investor seeking Norway&apos;s next breakout company — I&apos;m here to help.
          </p>
        </div>
      </div>

      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'start' }}>
            <div>
              <h2>Send a message</h2>
              <div className="divider" />
              <form style={{ marginTop: 'var(--gap-md)' }}>
                <div className="form-group">
                  <label htmlFor="name">Your name</label>
                  <input id="name" name="name" type="text" placeholder="Ola Nordmann" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input id="email" name="email" type="email" placeholder="ola@startup.no" />
                </div>
                <div className="form-group">
                  <label htmlFor="role">I am a&hellip;</label>
                  <select id="role" name="role">
                    <option value="">Select your role</option>
                    <option>Founder looking for investors</option>
                    <option>Investor looking for deals</option>
                    <option>Corporate exploring the ecosystem</option>
                    <option>Journalist / researcher</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" placeholder="Tell me what you&apos;re working on…" />
                </div>
                <button type="submit" className="btn btn-primary w-full" style={{ justifyContent: 'center' }}>
                  Send Message
                </button>
              </form>
            </div>

            <div style={{ paddingTop: 'var(--gap-sm)' }}>
              <h2>Contact details</h2>
              <div className="divider" />
              <div style={{ marginTop: 'var(--gap-md)', display: 'flex', flexDirection: 'column', gap: 'var(--gap-md)' }}>
                {[
                  { icon: '✉️', label: 'Email', value: 'hello@bess.no', href: 'mailto:hello@bess.no' },
                  { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/bessandersen', href: '#' },
                  { icon: '🐦', label: 'Twitter / X', value: '@bessandersen', href: '#' },
                  { icon: '📍', label: 'Location', value: 'Oslo, Norway', href: undefined },
                ].map(c => (
                  <div key={c.label} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--teal-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                      {c.icon}
                    </div>
                    <div>
                      <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', fontWeight: 600, marginBottom: 2 }}>{c.label}</p>
                      {c.href
                        ? <a href={c.href} style={{ color: 'var(--primary)', fontWeight: 500 }}>{c.value}</a>
                        : <span style={{ color: 'var(--primary)', fontWeight: 500 }}>{c.value}</span>
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
