import Link from 'next/link'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/lib/client'
import { postBySlugQuery, postsQuery } from '@/sanity/lib/queries'
import { urlForImage } from '@/sanity/lib/image'

export async function generateStaticParams() {
  try {
    const posts = await client.fetch(postsQuery)
    return posts?.map((p: { slug: { current: string } }) => ({ slug: p.slug.current })) || []
  } catch { return [] }
}

const portableTextComponents = {
  types: {
    image: ({ value }: { value: { asset: object; alt?: string } }) => {
      const url = urlForImage(value).width(1200).url()
      return (
        <figure style={{ margin: '2rem 0' }}>
          <Image
            src={url}
            alt={value.alt || ''}
            width={1200}
            height={630}
            style={{ width: '100%', height: 'auto', borderRadius: 8 }}
          />
        </figure>
      )
    },
  },
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

  const mainImageUrl = post.mainImage ? urlForImage(post.mainImage).width(1200).height(630).url() : null

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
          {post.tags?.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
              {post.tags.map((tag: string) => (
                <span key={tag} style={{ fontSize: 13, padding: '4px 10px', borderRadius: 20, background: 'var(--teal)', color: '#fff' }}>
                  {tag}
                </span>
              ))}
            </div>
          )}
          {post.excerpt && <p className="lead" style={{ marginTop: 16 }}>{post.excerpt}</p>}
        </div>
      </div>

      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container" style={{ maxWidth: 760 }}>
          {mainImageUrl && (
            <Image
              src={mainImageUrl}
              alt={post.mainImage?.alt || post.title}
              width={1200}
              height={630}
              style={{ width: '100%', height: 'auto', borderRadius: 8, marginBottom: 'var(--gap-md)' }}
              priority
            />
          )}
          {post.body ? (
            <div className="post-body">
              <PortableText value={post.body} components={portableTextComponents} />
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
