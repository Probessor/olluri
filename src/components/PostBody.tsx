'use client'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { urlForImage } from '@/sanity/lib/image'

function getYouTubeId(url: string) {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/)
  return match?.[1] ?? null
}

const components = {
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
    youtube: ({ value }: { value: { url: string } }) => {
      const id = getYouTubeId(value.url)
      if (!id) return null
      return (
        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, margin: '2rem 0', borderRadius: 8, overflow: 'hidden' }}>
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
          />
        </div>
      )
    },
  },
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PostBody({ value }: { value: any[] }) {
  return (
    <div className="post-body" style={{ lineHeight: 1.8 }}>
      <PortableText value={value} components={components} />
    </div>
  )
}
