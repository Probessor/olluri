import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { postBySlugQuery, postsQuery } from '@/sanity/lib/queries'

export async function generateStaticParams() {
  try {
    const posts = await client.fetch(postsQuery)
    return posts?.map((p: { slug: { current: string } }) => ({ slug: p.slug.current })) || []
  } catch { return [] }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let post = null
  try {
    post = await client.fetch(postBySlugQuery, { slug })
  } catch { /* use fallback */ }

  if (!post) {
    return (
      <div className="page-hero">
        <div className="container">
          <span className="label">Not Found</span>
          <h1>Post not found</h1>
          <p style={{ marginTop: 12 }}>This post may not be published yet. <Link href="/blog" style={{ color: 'var(--teal)' }}>Back to insights →</Link></p>
        </div>
      </div>
    )
  }

  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : null

  return (
    <>
      <div className="page-hero">
        <div className="container" style={{ maxWidth: 760 }}>
          {post.category && <span className="label">{post.category}</span>}
          <h1 style={{ marginTop: 10 }}>{post.title}</h1>
          <div className="blog-meta" style={{ marginTop: 16 }}>
            {date && <span>{date}</span>}
            {post.readTime && <><div className="blog-meta-dot" /><span>{post.readTime}</span></>}
          </div>
          {post.excerpt && <p className="lead" style={{ marginTop: 16 }}>{post.excerpt}</p>}
        </div>
      </div>

      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container" style={{ maxWidth: 760 }}>
          {post.body ? (
            <div className="post-body">
              {/* Portable text rendering — install @portabletext/react for rich text */}
              <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
                [Add <code>@portabletext/react</code> to render rich body content from Sanity]
              </p>
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)' }}>No content yet — add body text in Sanity Studio.</p>
          )}
          <div style={{ marginTop: 'var(--gap-lg)', paddingTop: 'var(--gap-md)', borderTop: '1px solid var(--border-light)' }}>
            <Link href="/blog" className="btn btn-outline">← Back to Insights</Link>
          </div>
        </div>
      </section>
    </>
  )
}
