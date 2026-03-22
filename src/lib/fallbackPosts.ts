import type { PostData } from '@/components/BlogCard'

export const FALLBACK_POSTS: PostData[] = [
  {
    _id: 'f1',
    title: 'Møt Pineapple: Norsk fintech som gjør bedriftsbetaling enklere',
    slug: { current: 'motet-pineapple-norsk-fintech' },
    excerpt: 'Oslo-baserte Pineapple har bygget en betalingsplattform som lar SMB-er håndtere fakturaer, lønn og utgifter i ett og samme system — uten Excel og manuell bokføring.',
    category: 'Startup',
    publishedAt: '2026-03-22',
    readTime: '6 min read',
    tags: ['Fintech', 'B2B', 'Oslo'],
    interviewed: ['Sofie Bakke', 'Jonas Hagen'],
    startupWebsite: 'https://pineapple.no',
  },
  {
    _id: 'f2',
    title: 'Hvordan Driftr vil revolusjonere eiendomsforvaltning i Norge',
    slug: { current: 'driftr-eiendomsforvaltning' },
    excerpt: 'Driftr er en proptech-startup fra Bergen som automatiserer vedlikehold og kommunikasjon mellom utleiere og leietakere.',
    category: 'Startup',
    publishedAt: '2026-03-22',
    readTime: '4 min read',
    tags: ['Proptech', 'Bergen'],
    interviewed: ['Maren Lund'],
  },
  {
    _id: 'f3',
    title: 'Nytt fond fra Northlight Capital retter seg mot norsk klimatech',
    slug: { current: 'northlight-capital-klimatech-fond' },
    excerpt: 'Det Oslo-baserte venture-fondet Northlight Capital har hentet 400 millioner kroner øremerket norske og nordiske klimatechselskaper i tidligfase.',
    category: 'Investor',
    publishedAt: '2026-03-22',
    readTime: '3 min read',
    tags: ['VC', 'Klimatech'],
  },
]
