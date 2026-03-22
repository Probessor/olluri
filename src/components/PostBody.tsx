'use client'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { urlForImage } from '@/sanity/lib/image'

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
  },
}

export default function PostBody({ value }: { value: unknown[] }) {
  return (
    <div className="post-body" style={{ lineHeight: 1.8 }}>
      <PortableText value={value} components={components} />
    </div>
  )
}
