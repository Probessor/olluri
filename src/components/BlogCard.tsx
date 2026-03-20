import Link from 'next/link'
import Image from 'next/image'
import { urlForImage } from '@/sanity/lib/image'

export interface PostData {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  category?: string
  publishedAt?: string
  readTime?: string
  mainImage?: { asset: object; alt?: string }
  tags?: string[]
}

function formatDate(iso?: string) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function BlogCardFeatured({ post }: { post: PostData }) {
  const imgUrl = post.mainImage ? urlForImage(post.mainImage).width(800).height(400).url() : null

  return (
    <Link href={`/blog/${post.slug.current}`} className="blog-card-featured">
      <div className="blog-featured-img" style={{ minHeight: 300, overflow: 'hidden', position: 'relative', background: 'linear-gradient(135deg, var(--primary) 0%, var(--teal) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem' }}>
        {imgUrl
          ? <Image src={imgUrl} alt={post.mainImage?.alt || post.title} fill style={{ objectFit: 'cover' }} />
          : '🇳🇴'
        }
      </div>
      <div className="blog-featured-body">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
          {post.category && <span className="tag">{post.category}</span>}
          {post.tags?.map(tag => (
            <span key={tag} style={{ fontSize: 12, padding: '3px 8px', borderRadius: 20, background: 'var(--teal)', color: '#fff' }}>{tag}</span>
          ))}
        </div>
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
  const imgUrl = post.mainImage ? urlForImage(post.mainImage).width(600).height(320).url() : null
  const bg = gradient || 'linear-gradient(135deg, var(--surface), var(--surface-2))'

  return (
    <Link href={`/blog/${post.slug.current}`} className="blog-card-sm">
      <div className="blog-card-sm-img" style={{ height: 160, overflow: 'hidden', position: 'relative', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>
        {imgUrl
          ? <Image src={imgUrl} alt={post.mainImage?.alt || post.title} fill style={{ objectFit: 'cover' }} />
          : '💡'
        }
      </div>
      <div className="blog-card-sm-body">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
          {post.category && <span className="tag">{post.category}</span>}
          {post.tags?.map(tag => (
            <span key={tag} style={{ fontSize: 12, padding: '3px 8px', borderRadius: 20, background: 'var(--teal)', color: '#fff' }}>{tag}</span>
          ))}
        </div>
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
