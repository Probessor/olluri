import Link from 'next/link'

export interface PostData {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  category?: string
  publishedAt?: string
  readTime?: string
}

function formatDate(iso?: string) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function BlogCardFeatured({ post }: { post: PostData }) {
  return (
    <Link href={`/blog/${post.slug.current}`} className="blog-card-featured">
      <div className="blog-featured-img" style={{ background: 'linear-gradient(135deg, var(--primary) 0%, var(--teal) 100%)', minHeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem' }}>
        🇳🇴
      </div>
      <div className="blog-featured-body">
        {post.category && <span className="tag">{post.category}</span>}
        <h3>{post.title}</h3>
        {post.excerpt && <p>{post.excerpt}</p>}
        <div className="blog-meta">
          {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
          {post.readTime && <><div className="blog-meta-dot" /><span>{post.readTime}</span></>}
        </div>
      </div>
    </Link>
  )
}

export function BlogCardSmall({ post, gradient }: { post: PostData; gradient?: string }) {
  const bg = gradient || 'linear-gradient(135deg, var(--surface), var(--surface-2))'
  return (
    <Link href={`/blog/${post.slug.current}`} className="blog-card-sm">
      <div className="blog-card-sm-img" style={{ background: bg, height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>
        💡
      </div>
      <div className="blog-card-sm-body">
        {post.category && <span className="tag">{post.category}</span>}
        <h4>{post.title}</h4>
        {post.excerpt && <p>{post.excerpt}</p>}
        <div className="blog-meta" style={{ marginTop: 12 }}>
          {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
          {post.readTime && <><div className="blog-meta-dot" /><span>{post.readTime}</span></>}
        </div>
      </div>
    </Link>
  )
}
