import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { postsQuery } from '@/sanity/lib/queries'
import { BlogCardFeatured, BlogCardSmall, type PostData } from '@/components/BlogCard'

const FALLBACK_POSTS: PostData[] = [
  { _id: '1', title: "Norway's Startup Scene in 2026: What Investors Need to Know Right Now", slug: { current: 'norway-startup-scene-2026' }, excerpt: 'A comprehensive look at the forces reshaping Norwegian venture capital.', category: 'Ecosystem', publishedAt: '2026-03-08', readTime: '7 min read' },
  { _id: '2', title: "The Green Wave: Norway's CleanTech Startups Redefining Energy", slug: { current: 'cleantech-green-wave' }, excerpt: 'Why Scandinavia is becoming the global laboratory for sustainable energy innovation.', category: 'CleanTech', publishedAt: '2026-02-24', readTime: '5 min read' },
  { _id: '3', title: 'Nordic Startup Awards 2025: The Winners and What They Tell Us', slug: { current: 'nordic-startup-awards-2025' }, excerpt: 'Breaking down the standout companies and the trends they represent.', category: 'Awards', publishedAt: '2026-01-15', readTime: '4 min read' },
  { _id: '4', title: 'Why Nordic Founders Build Differently — and Why It Works', slug: { current: 'nordic-founders-build-differently' }, excerpt: 'The cultural DNA that makes Norwegian startups resilient and globally minded.', category: 'Culture', publishedAt: '2025-12-10', readTime: '6 min read' },
  { _id: '5', title: 'Meet Norway\'s Next Wave of Deep Tech Founders', slug: { current: 'next-wave-deep-tech' }, excerpt: 'A new generation of technically-led founders is emerging from NTNU and UiO.', category: 'Deep Tech', publishedAt: '2025-11-20', readTime: '5 min read' },
  { _id: '6', title: 'Oslo vs. Stockholm: The Nordic Startup Capital Debate', slug: { current: 'oslo-vs-stockholm' }, excerpt: 'Two cities, two ecosystems — and why they\'re more complementary than competitive.', category: 'Ecosystem', publishedAt: '2025-10-05', readTime: '8 min read' },
]

export default async function BlogPage() {
  let posts: PostData[] = FALLBACK_POSTS
  try {
    const data = await client.fetch(postsQuery)
    if (data?.length) posts = data
  } catch { /* use fallback */ }

  const [featured, ...rest] = posts

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="label">Insights &amp; Analysis</span>
          <h1>From the field</h1>
          <p className="lead" style={{ marginTop: 12 }}>
            Dispatches from inside the Norwegian startup ecosystem — funding news, founder profiles, and ecosystem analysis.
          </p>
        </div>
      </div>

      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="section-header-row">
            <div><span className="label">Latest</span><h2>Most recent</h2></div>
          </div>
          {featured && <BlogCardFeatured post={featured} />}
          <div className="grid-3" style={{ marginTop: 'var(--gap-md)' }}>
            {rest.map(post => <BlogCardSmall key={post._id} post={post} />)}
          </div>
        </div>
      </section>

      <div className="container">
        <div className="cta-section">
          <span className="label" style={{ color: 'var(--teal)' }}>Stay in the loop</span>
          <h2>Want these insights<br />in your inbox?</h2>
          <p>Get my weekly roundup of Norwegian startup news, funding rounds, and ecosystem updates.</p>
          <div className="flex gap-sm" style={{ justifyContent: 'center' }}>
            <Link href="/contact" className="btn btn-teal">Subscribe</Link>
          </div>
        </div>
      </div>
    </>
  )
}
