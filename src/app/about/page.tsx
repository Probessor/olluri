import Link from 'next/link'

export default function AboutPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="label">About me</span>
          <h1>A scout who lives<br />in the ecosystem</h1>
          <p className="lead" style={{ marginTop: 12 }}>
            I&apos;ve spent the last 8 years embedded in the Norwegian startup world.
          </p>
        </div>
      </div>

      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="about-teaser">
            <div className="about-teaser-img">
              <div className="portrait-placeholder" />
              <div className="name-badge">
                <strong>Bess Andersen</strong>
                <span>Startup Scout · Oslo, Norway</span>
              </div>
            </div>
            <div>
              <span className="label">My story</span>
              <h2>Finding signal<br />in the noise</h2>
              <div className="divider" />
              <p className="lead">
                I&apos;ve spent the last 8 years embedded in the Norwegian startup world — attending every pitch night, every demo day, reading every funding announcement — so you don&apos;t have to.
              </p>
              <p style={{ marginTop: 12 }}>
                My job is to find the signal in the noise: the founders with genuine traction, the ideas with real defensibility, and the teams that won&apos;t quit when it gets hard.
              </p>
              <p style={{ marginTop: 12 }}>
                Before scouting, I spent time at Innovation Norway, worked alongside several early-stage teams, and wrote extensively about the Nordic VC ecosystem. That background gives me a perspective that&apos;s grounded in both the operational and financial reality of building in Norway.
              </p>
              <div className="about-values" style={{ marginTop: 'var(--gap-md)' }}>
                {[
                  { icon: '🏔️', title: 'Nordic at heart', text: 'Deep roots in the Scandinavian business culture' },
                  { icon: '🤝', title: 'Relationship first', text: 'Every deal starts with a genuine connection' },
                  { icon: '🔍', title: 'Rigorous research', text: 'Data-backed opinions, not hype-driven takes' },
                  { icon: '🌱', title: 'Long-term impact', text: 'Building an ecosystem that lasts generations' },
                ].map(v => (
                  <div key={v.title} className="value-item">
                    <div className="value-icon">{v.icon}</div>
                    <div><h5>{v.title}</h5><p>{v.text}</p></div>
                  </div>
                ))}
              </div>
              <Link href="/contact" className="btn btn-primary mt-md">Work With Me →</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container text-center">
          <span className="label">By the numbers</span>
          <h2>8 years in the ecosystem</h2>
          <div className="grid-3" style={{ marginTop: 'var(--gap-md)', maxWidth: 700, margin: 'var(--gap-md) auto 0' }}>
            {[
              { value: '120+', label: 'Startups scouted' },
              { value: '60+', label: 'Investors connected' },
              { value: '8+', label: 'Years in ecosystems' },
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <h2 style={{ fontSize: '3rem', marginBottom: 4 }}>{s.value}</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
