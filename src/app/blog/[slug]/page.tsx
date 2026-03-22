export const dynamic = 'force-dynamic'

import Link from 'next/link'
import Image from 'next/image'

import { client } from '@/sanity/lib/client'
import { postBySlugQuery, postsQuery } from '@/sanity/lib/queries'
import { urlForImage } from '@/sanity/lib/image'
import { FALLBACK_POSTS } from '@/lib/fallbackPosts'
import PostBody from '@/components/PostBody'

export async function generateStaticParams() {
  try {
    const posts = await client.fetch(postsQuery)
    return posts?.map((p: { slug: { current: string } }) => ({ slug: p.slug.current })) || []
  } catch { return [] }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)
  let post = null
  try {
    post = await client.fetch(postBySlugQuery, { slug: decodedSlug })
  } catch (err) {
    console.error('[slug page] fetch error:', err)
  }

  if (!post) {
    post = FALLBACK_POSTS.find(p => p.slug.current === decodedSlug) ?? null
  }

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

  const mainImageUrl = post.mainImage ? urlForImage(post.mainImage).width(1600).url() : null
  const hotspot = post.mainImage?.hotspot
  const objectPosition = hotspot ? `${hotspot.x * 100}% ${hotspot.y * 100}%` : 'center'

  return (
    <div style={{ background: 'var(--white)' }}>
      {/* Banner image */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: 480,
        marginTop: 'var(--nav-height)',
        background: 'var(--white)',
      }}>
        {mainImageUrl && (
          <Image
            src={mainImageUrl}
            alt={post.mainImage?.alt || post.title}
            fill
            style={{ objectFit: 'cover', objectPosition }}
            priority
          />
        )}
      </div>

      {/* Frosted frame — overlaps bottom of banner */}
      <div className="container" style={{ maxWidth: 760, position: 'relative', zIndex: 2, marginTop: -240 }}>
        <div style={{
          background: 'rgba(255,255,255,0.55)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderRadius: 'var(--radius)',
          padding: 'var(--gap-md)',
          border: '1px solid rgba(255,255,255,0.4)',
        }}>
          {post.category && <span className="label">{post.category}</span>}
          <h1 style={{ marginTop: 10, color: 'var(--text)' }}>{post.title}</h1>
          {post.excerpt && <p className="lead" style={{ marginTop: 16, marginBottom: 0 }}>{post.excerpt}</p>}
        </div>
      </div>

      <section className="section" style={{ background: 'var(--white)', paddingTop: 0, marginTop: -8 }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <div style={{ marginBottom: 'var(--gap-md)', marginTop: 0 }}>
            {post.mainImage?.alt && (
              <p style={{ margin: '0 0 6px', fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>{post.mainImage.alt}</p>
            )}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
              {date && <span className="blog-meta">{date}</span>}
              {post.readTime && <><div className="blog-meta-dot" /><span className="blog-meta">{post.readTime}</span></>}
            </div>
            {post.tags && post.tags.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
                {post.tags.map((tag: string) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            )}
          </div>

          {post.body ? (
            <PostBody value={post.body} />
          ) : (
            <p style={{ color: 'var(--text-muted)' }}>No content yet — add body text in Sanity Studio.</p>
          )}
          {(post.startupLogo || post.startupName || post.startupWebsite || post.interviewed?.length > 0) && (
            <div style={{ marginTop: 'var(--gap-lg)', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, padding: '20px 24px', borderRadius: 'var(--radius)', background: 'var(--surface)', alignItems: 'center' }}>
              {/* Column 1: Logo */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {post.startupLogo && (
                  <Image
                    src={urlForImage(post.startupLogo).width(240).height(120).fit('max').url()}
                    alt={post.startupLogo.alt || 'Startup logo'}
                    width={120}
                    height={60}
                    style={{ objectFit: 'contain', borderRadius: 6 }}
                  />
                )}
              </div>
              {/* Column 2: Startup name + website */}
              <div>
                {post.startupName && (
                  <p style={{ margin: 0, fontWeight: 700, fontSize: '1rem', color: 'var(--text)' }}>{post.startupName}</p>
                )}
                {post.startupWebsite && (
                  <a href={post.startupWebsite} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: 4, fontSize: '0.85rem', color: 'var(--teal)' }}>{post.startupWebsite}</a>
                )}
              </div>
              {/* Column 3: Interviewees + titles */}
              <div>
                {post.interviewed?.map((name: string, i: number) => (
                  <div key={name} style={{ marginBottom: 6 }}>
                    <p style={{ margin: 0, fontWeight: 600, color: 'var(--text)' }}>{name}</p>
                    {post.intervieweeTitles?.[i] && (
                      <p style={{ margin: '2px 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{post.intervieweeTitles[i]}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          {date && (
            <p className="blog-meta" style={{ marginTop: 12 }}>{date}</p>
          )}
          <div style={{ marginTop: 'var(--gap-md)', paddingTop: 'var(--gap-md)', borderTop: '1px solid var(--border-light)' }}>
            <Link href="/blog" className="btn btn-outline">← Tilbake til innsikt</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
