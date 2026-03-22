import { groq } from 'next-sanity'

export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id, title, slug, excerpt, category, publishedAt, readTime, tags,
    mainImage { asset->, alt, hotspot, crop }
  }
`

export const latestPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) [0...4] {
    _id, title, slug, excerpt, category, publishedAt, readTime, tags,
    mainImage { asset->, alt, hotspot, crop }
  }
`

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id, title, slug, excerpt, category, publishedAt, readTime, tags,
    startupName, interviewed, intervieweeTitles, startupWebsite,
    mainImage { asset->, alt, hotspot, crop },
    startupLogo { asset->, alt },
    body[] {
      ...,
      _type == "image" => { ..., asset-> }
    }
  }
`

export const startupsQuery = groq`
  *[_type == "startup"] | order(_createdAt asc) {
    _id, name, slug, sector, city, description, tag, icon
  }
`

export const servicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    _id, title, description, icon, order
  }
`

export const hubsQuery = groq`
  *[_type == "hub"] | order(_createdAt asc) {
    _id, name, city, focus, description, icon
  }
`

export const eventsQuery = groq`
  *[_type == "event"] | order(date asc) {
    _id, title, date, location, description
  }
`

export const productsQuery = groq`
  *[_type == "product"] | order(order asc) {
    _id, title, description, price, icon, link, order
  }
`

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    heroTagline, heroBio, stats
  }
`
