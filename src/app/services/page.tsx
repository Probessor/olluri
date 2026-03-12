import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { servicesQuery } from '@/sanity/lib/queries'
import ServiceCard, { type ServiceData } from '@/components/ServiceCard'

const FALLBACK_SERVICES: ServiceData[] = [
  { _id: '1', title: 'Startup Scouting', description: 'I systematically scan the Norwegian startup ecosystem to surface companies with genuine traction before they become widely known. You get a curated shortlist, not a database.', icon: '🔭', order: 1 },
  { _id: '2', title: 'Investor Matching', description: 'Every investor has a thesis. I match founders with the investors whose thesis actually fits — increasing the probability of a yes and saving time for everyone.', icon: '🤝', order: 2 },
  { _id: '3', title: 'Ecosystem Consulting', description: 'Need to understand the Norwegian startup landscape quickly? I provide strategic briefings, ecosystem maps, and event calendars for investors and corporates entering the market.', icon: '🗺️', order: 3 },
  { _id: '4', title: 'Speaking & Events', description: 'I speak at conferences, run workshops on Nordic venture trends, and facilitate connections at ecosystem events across Scandinavia.', icon: '🎤', order: 4 },
  { _id: '5', title: 'Due Diligence Support', description: 'Reference checks, market validation, and competitor mapping for investors conducting due diligence on Norwegian companies.', icon: '🔍', order: 5 },
  { _id: '6', title: 'Founder Coaching', description: 'Investor readiness, pitch preparation, and fundraising strategy for early-stage Norwegian founders preparing to raise international capital.', icon: '🚀', order: 6 },
]

export default async function ServicesPage() {
  let services: ServiceData[] = FALLBACK_SERVICES
  try {
    const data = await client.fetch(servicesQuery)
    if (data?.length) services = data
  } catch { /* use fallback */ }

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="label">What I offer</span>
          <h1>Services</h1>
          <p className="lead" style={{ marginTop: 12 }}>
            I work with a small number of investors and founders at a time, so every engagement gets my full attention.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="grid-3">
            {services.map((s, i) => <ServiceCard key={s._id} service={s} index={i} />)}
          </div>
        </div>
      </section>

      <div className="container">
        <div className="cta-section">
          <span className="label" style={{ color: 'var(--teal)' }}>Let&apos;s talk</span>
          <h2>Not sure which service fits?</h2>
          <p>Send me a message and we&apos;ll figure out the right way to work together.</p>
          <div className="flex gap-sm" style={{ justifyContent: 'center' }}>
            <Link href="/contact" className="btn btn-teal">Get in Touch</Link>
          </div>
        </div>
      </div>
    </>
  )
}
