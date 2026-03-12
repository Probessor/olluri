import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { latestPostsQuery, startupsQuery, servicesQuery, hubsQuery, siteSettingsQuery } from '@/sanity/lib/queries'
import { BlogCardFeatured, BlogCardSmall, type PostData } from '@/components/BlogCard'
import StartupCard, { type StartupData } from '@/components/StartupCard'
import ServiceCard, { type ServiceData } from '@/components/ServiceCard'

// --- Static fallbacks (used until Sanity is connected) ---
const FALLBACK_POSTS: PostData[] = [
  { _id: '1', title: "Norway's Startup Scene in 2026: What Investors Need to Know Right Now", slug: { current: 'norway-startup-scene-2026' }, excerpt: 'A comprehensive look at the forces reshaping Norwegian venture capital — from green energy shifts to the rise of deep tech in Trondheim.', category: 'Ecosystem', publishedAt: '2026-03-08', readTime: '7 min read' },
  { _id: '2', title: "The Green Wave: Norway's CleanTech Startups Redefining Energy", slug: { current: 'cleantech-green-wave' }, excerpt: 'Why Scandinavia is becoming the global laboratory for sustainable energy innovation.', category: 'CleanTech', publishedAt: '2026-02-24', readTime: '5 min read' },
  { _id: '3', title: 'Nordic Startup Awards 2025: The Winners and What They Tell Us', slug: { current: 'nordic-startup-awards-2025' }, excerpt: 'Breaking down the standout companies and the trends they represent.', category: 'Awards', publishedAt: '2026-01-15', readTime: '4 min read' },
  { _id: '4', title: 'Why Nordic Founders Build Differently — and Why It Works', slug: { current: 'nordic-founders-build-differently' }, excerpt: 'The cultural DNA that makes Norwegian startups resilient and globally minded.', category: 'Culture', publishedAt: '2025-12-10', readTime: '6 min read' },
]

const FALLBACK_STARTUPS: StartupData[] = [
  { _id: '1', name: 'Orca Hydrogen', icon: '🌊', tag: 'CleanTech', sector: 'Green Energy', city: 'Oslo', description: 'Pioneering scalable hydrogen production using Norway\'s abundant hydropower resources.' },
  { _id: '2', name: 'Synapse Nordic', icon: '🧠', tag: 'AI / Deep Tech', sector: 'Industrial AI', city: 'Trondheim', description: 'Applying machine learning to predictive maintenance in the offshore energy sector.' },
  { _id: '3', name: 'Fjord Farms', icon: '🌱', tag: 'AgriTech', sector: 'Vertical Farming', city: 'Bergen', description: 'Reinventing Nordic food production with data-driven indoor farming at scale.' },
  { _id: '4', name: 'BuildSense', icon: '🏗️', tag: 'PropTech', sector: 'Construction AI', city: 'Oslo', description: 'AI-powered platform cutting construction project overruns by 40% for Nordic developers.' },
  { _id: '5', name: 'Nordguard', icon: '🛡️', tag: 'CyberSecurity', sector: 'Security SaaS', city: 'Oslo', description: 'Enterprise-grade cybersecurity built for the unique needs of Nordic critical infrastructure.' },
  { _id: '6', name: 'WaveFreight', icon: '🚢', tag: 'Logistics', sector: 'Maritime Tech', city: 'Stavanger', description: 'Digital freight platform connecting Nordic shippers with global carriers in real time.' },
]

const FALLBACK_SERVICES: ServiceData[] = [
  { _id: '1', title: 'Startup Scouting', description: 'Identifying high-potential Norwegian startups before they hit the radar.', icon: '🔭', order: 1 },
  { _id: '2', title: 'Investor Matching', description: 'Connecting the right founders with the investors who will champion them.', icon: '🤝', order: 2 },
  { _id: '3', title: 'Ecosystem Consulting', description: 'Strategic guidance for navigating the Norwegian startup landscape.', icon: '🗺️', order: 3 },
  { _id: '4', title: 'Speaking & Events', description: 'Keynotes, panels, and workshops on Nordic innovation and venture trends.', icon: '🎤', order: 4 },
]

const FALLBACK_HUBS = [
  { _id: '1', name: 'StartupLab Oslo', icon: '🏙️', city: 'Oslo', focus: 'Tech', description: "Norway's premier deep tech accelerator, home to serial entrepreneurs and breakthrough science." },
  { _id: '2', name: 'Katapult', icon: '🌍', city: 'Oslo', focus: 'Impact', description: 'Impact-first accelerator and investor network amplifying startups solving global challenges.' },
  { _id: '3', name: 'Mesh Oslo', icon: '🤝', city: 'Oslo', focus: 'Community', description: 'Vibrant co-working community connecting founders, freelancers, and creators across industries.' },
  { _id: '4', name: 'NTNU TTO', icon: '🎓', city: 'Trondheim', focus: 'Research', description: "Trondheim's research-to-market engine, spinning out deep tech companies from world-class academia." },
  { _id: '5', name: 'Founders', icon: '⚡', city: 'Oslo', focus: 'VC', description: 'A tight-knit founder-first community offering mentorship, funding, and radical transparency.' },
  { _id: '6', name: 'Bergen Tech Hub', icon: '🌊', city: 'Bergen', focus: 'Maritime', description: "Western Norway's growing tech hub with a strong focus on maritime and clean energy ventures." },
]

async function getData() {
  try {
    const [posts, startups, services, hubs, settings] = await Promise.all([
      client.fetch(latestPostsQuery),
      client.fetch(startupsQuery),
      client.fetch(servicesQuery),
      client.fetch(hubsQuery),
      client.fetch(siteSettingsQuery),
    ])
    return { posts, startups, services, hubs, settings }
  } catch {
    return { posts: null, startups: null, services: null, hubs: null, settings: null }
  }
}

export default async function HomePage() {
  const { posts, startups, services, hubs, settings } = await getData()

  const displayPosts: PostData[] = (posts?.length ? posts : FALLBACK_POSTS)
  const displayStartups: StartupData[] = (startups?.length ? startups : FALLBACK_STARTUPS)
  const displayServices: ServiceData[] = (services?.length ? services : FALLBACK_SERVICES)
  const displayHubs = hubs?.length ? hubs : FALLBACK_HUBS

  const heroTagline = settings?.heroTagline || "Where great founders meet the right investors"
  const heroBio = settings?.heroBio || "I'm Bess — a startup scout and ecosystem connector navigating the Norwegian innovation landscape. I bridge the gap between ambitious founders and visionary investors."

  const [featured, ...rest] = displayPosts
  const cardGradients = [
    'linear-gradient(135deg, var(--teal-light), var(--teal-mid))',
    'linear-gradient(135deg, var(--warm-light), #F5D5C5)',
    'linear-gradient(135deg, var(--surface), var(--surface-2))',
  ]

  return (
    <>
      {/* HERO */}
      <section className="hero aurora-bg">
        <div className="container">
          <div className="hero-inner">
            <div className="hero-content">
              <div className="hero-eyebrow">
                <div className="hero-dot" />
                <span className="label">Oslo, Norway &mdash; Open for collaboration</span>
              </div>
              <h1 dangerouslySetInnerHTML={{ __html: heroTagline.replace('the right', '<em>the right</em>') }} />
              <p className="lead">{heroBio}</p>
              <div className="hero-cta">
                <Link href="/services" className="btn btn-primary">Explore Services</Link>
                <Link href="/about" className="btn btn-outline">My Story</Link>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-card-stack">
                <div className="hero-card-main">
                  <div className="hero-card-tag">
                    <div className="hero-card-avatar">🏔️</div>
                    <div className="hero-card-name">
                      <h4>Latest Scout Report</h4>
                      <p>Nordic Deep Tech — Q1 2026</p>
                    </div>
                  </div>
                  <p className="hero-card-quote">
                    &ldquo;Norway&apos;s deep tech scene is generating some of the most compelling investment opportunities in Europe right now.&rdquo;
                  </p>
                  <div className="hero-card-stats">
                    <div className="hcs-item"><strong>€2.1B</strong><span>Total raised</span></div>
                    <div className="hcs-item"><strong>34</strong><span>New deals</span></div>
                    <div className="hcs-item"><strong>12</strong><span>Top picks</span></div>
                  </div>
                </div>
                <div className="hero-card-float hero-card-float-1">
                  <span className="float-label">Active hubs</span>
                  <div className="float-hubs">
                    <span className="float-hub-pill">StartupLab</span>
                    <span className="float-hub-pill">Katapult</span>
                    <span className="float-hub-pill">Mesh Oslo</span>
                    <span className="float-hub-pill">Founders</span>
                  </div>
                </div>
                <div className="hero-card-float hero-card-float-2">
                  <div className="float-event">
                    <div className="float-event-icon">🗓️</div>
                    <div className="float-event-text">
                      <strong>Oslo Innovation Week</strong>
                      <p>Oct 2026 · Oslo</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNERS STRIP */}
      <div className="logos-strip">
        <div className="container">
          <div className="logos-inner">
            <span className="logos-label">Ecosystem partners</span>
            <div className="logos-list">
              {['StartupLab', 'Katapult', 'Mesh Oslo', 'Norse Ventures', 'Oslo Innovation Week', 'Investinor', 'Innovation Norway'].map(name => (
                <span key={name} className="logo-item">{name}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* BLOG PREVIEW */}
      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="section-header-row">
            <div>
              <span className="label">Fresh insights</span>
              <h2>From the field</h2>
            </div>
            <Link href="/blog" className="btn btn-outline">All Posts →</Link>
          </div>
          {featured && <BlogCardFeatured post={featured} />}
          <div className="grid-3">
            {rest.slice(0, 3).map((post, i) => (
              <BlogCardSmall key={post._id} post={post} gradient={cardGradients[i]} />
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="section">
        <div className="container">
          <div className="section-header-row">
            <div>
              <span className="label">What I do</span>
              <h2>How I create value<br />in the ecosystem</h2>
            </div>
            <Link href="/services" className="btn btn-outline">All Services →</Link>
          </div>
          <div className="grid-4">
            {displayServices.map((s, i) => <ServiceCard key={s._id} service={s} index={i} />)}
          </div>
        </div>
      </section>

      {/* FEATURED STARTUPS */}
      <section className="section startups-section">
        <div className="container">
          <div className="section-header-row">
            <div>
              <span className="label">On my radar</span>
              <h2>Norwegian startups<br />worth watching</h2>
            </div>
            <Link href="/blog" className="btn btn-outline">All Coverage →</Link>
          </div>
          <div className="grid-3">
            {displayStartups.slice(0, 6).map(s => <StartupCard key={s._id} startup={s} />)}
          </div>
        </div>
      </section>

      {/* INNOVATION HUBS */}
      <section className="section hubs-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="label">The ecosystem</span>
            <h2>Norway&apos;s innovation hubs</h2>
            <p className="lead" style={{ margin: '0 auto' }}>
              From Oslo to Tromsø, these are the spaces and communities where tomorrow&apos;s Norwegian companies are taking shape.
            </p>
          </div>
          <div className="grid-3" style={{ marginTop: 'var(--gap-md)' }}>
            {displayHubs.map((hub: typeof FALLBACK_HUBS[0]) => (
              <div key={hub._id} className="hub-card">
                <div className="hub-icon">{hub.icon}</div>
                <h4>{hub.name}</h4>
                <p>{hub.description}</p>
                <span className="tag" style={{ marginTop: 16, display: 'inline-block' }}>{hub.city} · {hub.focus}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section className="section">
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
              <span className="label">About me</span>
              <h2>A scout who lives<br />in the ecosystem</h2>
              <div className="divider" />
              <p className="lead">
                I&apos;ve spent the last 8 years embedded in the Norwegian startup world — attending every pitch night, every demo day, reading every funding announcement — so you don&apos;t have to.
              </p>
              <p style={{ marginTop: 12 }}>
                My job is to find the signal in the noise: the founders with genuine traction, the ideas with real defensibility, and the teams that won&apos;t quit when it gets hard.
              </p>
              <div className="about-values">
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
              <Link href="/about" className="btn btn-primary mt-md">More About Me →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="container">
        <div className="cta-section">
          <span className="label" style={{ color: 'var(--teal)' }}>Let&apos;s work together</span>
          <h2>Ready to explore what<br />Norway has to offer?</h2>
          <p>Whether you&apos;re a founder looking for the right investor, or an investor seeking Norway&apos;s next breakout company — I&apos;m here to bridge that gap.</p>
          <div className="flex gap-sm" style={{ justifyContent: 'center' }}>
            <Link href="/contact" className="btn btn-teal">Get in Touch</Link>
            <Link href="/services" className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,0.4)', color: 'rgba(255,255,255,0.85)' }}>See Services</Link>
          </div>
        </div>
      </div>
    </>
  )
}
