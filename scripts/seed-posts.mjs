import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'abo9hzxk',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const posts = [
  {
    title: "Norway's Startup Scene in 2026: What Investors Need to Know",
    slug: 'norway-startup-scene-2026',
    category: 'Ecosystem',
    excerpt: 'A comprehensive look at the forces reshaping Norwegian venture capital and what savvy investors should be watching right now.',
    readTime: '7 min read',
    publishedAt: '2026-03-08T09:00:00Z',
    tags: ['Norway', 'Venture Capital', 'Ecosystem'],
    body: [{ _type: 'block', _key: 'a1', style: 'normal', children: [{ _type: 'span', _key: 'a1s1', text: 'Norway\'s startup scene has evolved dramatically over the past few years. From fintech to cleantech, Norwegian founders are building globally competitive companies with a distinctly Nordic approach to business.' }], markDefs: [] }, { _type: 'block', _key: 'a2', style: 'h2', children: [{ _type: 'span', _key: 'a2s1', text: 'The Capital Is Flowing' }], markDefs: [] }, { _type: 'block', _key: 'a3', style: 'normal', children: [{ _type: 'span', _key: 'a3s1', text: 'Record amounts of venture capital were deployed in Norway last year, with particular strength in deep tech and sustainability-focused companies. Oslo has firmly established itself as the startup capital of the Nordics.' }], markDefs: [] }],
  },
  {
    title: "The Green Wave: Norway's CleanTech Startups Redefining Energy",
    slug: 'cleantech-green-wave',
    category: 'CleanTech',
    excerpt: 'Why Scandinavia is becoming the global laboratory for sustainable energy innovation.',
    readTime: '5 min read',
    publishedAt: '2026-02-24T09:00:00Z',
    tags: ['CleanTech', 'Sustainability', 'Energy'],
    body: [{ _type: 'block', _key: 'b1', style: 'normal', children: [{ _type: 'span', _key: 'b1s1', text: 'Norway\'s abundance of renewable energy and deep engineering talent has created a perfect storm for cleantech innovation. Startups here are tackling everything from green hydrogen to carbon capture at a scale that\'s attracting global attention.' }], markDefs: [] }, { _type: 'block', _key: 'b2', style: 'h2', children: [{ _type: 'span', _key: 'b2s1', text: 'Leading Companies to Watch' }], markDefs: [] }, { _type: 'block', _key: 'b3', style: 'normal', children: [{ _type: 'span', _key: 'b3s1', text: 'Several Norwegian cleantech startups have recently closed significant funding rounds, signalling strong investor confidence in the sector.' }], markDefs: [] }],
  },
  {
    title: 'Nordic Startup Awards 2025: The Winners and What They Tell Us',
    slug: 'nordic-startup-awards-2025',
    category: 'Awards',
    excerpt: 'Breaking down the standout companies and the trends they represent heading into 2026.',
    readTime: '4 min read',
    publishedAt: '2026-01-15T09:00:00Z',
    tags: ['Awards', 'Nordic', 'Startups'],
    body: [{ _type: 'block', _key: 'c1', style: 'normal', children: [{ _type: 'span', _key: 'c1s1', text: 'The Nordic Startup Awards drew record participation in 2025, with over 800 companies entering across 12 categories. The winners paint a clear picture of where innovation is happening in the region.' }], markDefs: [] }, { _type: 'block', _key: 'c2', style: 'h2', children: [{ _type: 'span', _key: 'c2s1', text: 'Key Trends from the Winners' }], markDefs: [] }, { _type: 'block', _key: 'c3', style: 'normal', children: [{ _type: 'span', _key: 'c3s1', text: 'AI-enabled B2B software and climate tech dominated this year\'s awards, with health tech also showing strong growth. The geographic spread of winners is also widening beyond Oslo.' }], markDefs: [] }],
  },
  {
    title: 'Why Nordic Founders Build Differently — and Why It Works',
    slug: 'nordic-founders-build-differently',
    category: 'Culture',
    excerpt: 'The cultural DNA that makes Norwegian startups resilient and globally minded from day one.',
    readTime: '6 min read',
    publishedAt: '2025-12-10T09:00:00Z',
    tags: ['Culture', 'Founders', 'Nordic'],
    body: [{ _type: 'block', _key: 'd1', style: 'normal', children: [{ _type: 'span', _key: 'd1s1', text: 'There\'s something different about the way Norwegian founders approach company building. Rooted in a culture of trust, flat hierarchies, and long-term thinking, Nordic startups often build more sustainably — and more durably.' }], markDefs: [] }, { _type: 'block', _key: 'd2', style: 'h2', children: [{ _type: 'span', _key: 'd2s1', text: 'The Janteloven Paradox' }], markDefs: [] }, { _type: 'block', _key: 'd3', style: 'normal', children: [{ _type: 'span', _key: 'd3s1', text: 'Historically, Nordic culture discouraged standing out — but today\'s founders are flipping this script, building bold companies while retaining the humility and substance that characterises the best Nordic businesses.' }], markDefs: [] }],
  },
  {
    title: "Meet Norway's Next Wave of Deep Tech Founders",
    slug: 'next-wave-deep-tech',
    category: 'Deep Tech',
    excerpt: 'A new generation of technically-led founders is emerging from NTNU and UiO with world-class ambitions.',
    readTime: '5 min read',
    publishedAt: '2025-11-20T09:00:00Z',
    tags: ['Deep Tech', 'NTNU', 'Research'],
    body: [{ _type: 'block', _key: 'e1', style: 'normal', children: [{ _type: 'span', _key: 'e1s1', text: 'Norway\'s top universities are producing a new generation of deep tech founders who are translating cutting-edge research into commercial ventures. From quantum computing to advanced materials, the pipeline is impressive.' }], markDefs: [] }, { _type: 'block', _key: 'e2', style: 'h2', children: [{ _type: 'span', _key: 'e2s1', text: 'The University-to-Startup Pipeline' }], markDefs: [] }, { _type: 'block', _key: 'e3', style: 'normal', children: [{ _type: 'span', _key: 'e3s1', text: 'NTNU\'s Technology Transfer Office reported a record number of spinouts last year, with several already attracting international investors in their seed rounds.' }], markDefs: [] }],
  },
  {
    title: 'Oslo vs. Stockholm: The Nordic Startup Capital Debate',
    slug: 'oslo-vs-stockholm',
    category: 'Ecosystem',
    excerpt: "Two cities, two ecosystems — and why they're more complementary than competitive.",
    readTime: '8 min read',
    publishedAt: '2025-10-05T09:00:00Z',
    tags: ['Oslo', 'Stockholm', 'Ecosystem'],
    body: [{ _type: 'block', _key: 'f1', style: 'normal', children: [{ _type: 'span', _key: 'f1s1', text: 'The debate over which Nordic city deserves the title of startup capital misses the point. Oslo and Stockholm are increasingly interconnected ecosystems, with capital, talent, and companies flowing freely between them.' }], markDefs: [] }, { _type: 'block', _key: 'f2', style: 'h2', children: [{ _type: 'span', _key: 'f2s1', text: 'Where Oslo Leads' }], markDefs: [] }, { _type: 'block', _key: 'f3', style: 'normal', children: [{ _type: 'span', _key: 'f3s1', text: 'Oslo punches above its weight in maritime tech, energy tech, and fintech. Its proximity to major sovereign wealth and pension funds also gives it a unique advantage for later-stage fundraising.' }], markDefs: [] }],
  },
  {
    title: 'How Norwegian B2B SaaS Companies Are Winning in Europe',
    slug: 'norwegian-b2b-saas-europe',
    category: 'SaaS',
    excerpt: 'A playbook is emerging for how Norwegian software companies go from Oslo to all of Europe.',
    readTime: '6 min read',
    publishedAt: '2025-09-18T09:00:00Z',
    tags: ['SaaS', 'B2B', 'Europe', 'Growth'],
    body: [{ _type: 'block', _key: 'g1', style: 'normal', children: [{ _type: 'span', _key: 'g1s1', text: 'Norwegian B2B SaaS companies are quietly building some of Europe\'s most efficient go-to-market engines. By starting in a small but sophisticated home market, they develop tight product-market fit before expanding south.' }], markDefs: [] }, { _type: 'block', _key: 'g2', style: 'h2', children: [{ _type: 'span', _key: 'g2s1', text: 'The Nordic Advantage' }], markDefs: [] }, { _type: 'block', _key: 'g3', style: 'normal', children: [{ _type: 'span', _key: 'g3s1', text: 'High digital adoption, English proficiency, and demanding enterprise customers at home mean Norwegian SaaS products arrive in larger markets already battle-tested.' }], markDefs: [] }],
  },
  {
    title: 'The Rise of Female Founders in the Norwegian Startup Scene',
    slug: 'female-founders-norway',
    category: 'People',
    excerpt: 'More women are founding and leading high-growth startups in Norway than ever before.',
    readTime: '5 min read',
    publishedAt: '2025-08-12T09:00:00Z',
    tags: ['Diversity', 'Founders', 'Women in Tech'],
    body: [{ _type: 'block', _key: 'h1', style: 'normal', children: [{ _type: 'span', _key: 'h1s1', text: 'Norway has long led on gender equality in society, and that culture is now showing up in its startup ecosystem. The number of female-led startups raising venture capital has increased significantly over the past three years.' }], markDefs: [] }, { _type: 'block', _key: 'h2', style: 'h2', children: [{ _type: 'span', _key: 'h2s1', text: 'Programmes Making a Difference' }], markDefs: [] }, { _type: 'block', _key: 'h3', style: 'normal', children: [{ _type: 'span', _key: 'h3s1', text: 'Initiatives like Female Founders Norway and dedicated accelerator tracks have created a visible pipeline of women-led companies ready to scale.' }], markDefs: [] }],
  },
  {
    title: 'Maritime Tech: Norway\'s Oldest Industry Gets a Startup Makeover',
    slug: 'maritime-tech-startup-makeover',
    category: 'Maritime',
    excerpt: "Norway's centuries-old maritime heritage is spawning a new generation of tech-first shipping and ocean companies.",
    readTime: '7 min read',
    publishedAt: '2025-07-03T09:00:00Z',
    tags: ['Maritime', 'Deep Tech', 'Ocean'],
    body: [{ _type: 'block', _key: 'i1', style: 'normal', children: [{ _type: 'span', _key: 'i1s1', text: 'Norway has been a maritime nation for millennia. Today, that deep expertise is being combined with modern software, AI, and autonomy to build the next generation of ocean technology companies.' }], markDefs: [] }, { _type: 'block', _key: 'i2', style: 'h2', children: [{ _type: 'span', _key: 'i2s1', text: 'Autonomous Shipping Takes Centre Stage' }], markDefs: [] }, { _type: 'block', _key: 'i3', style: 'normal', children: [{ _type: 'span', _key: 'i3s1', text: 'Several Norwegian startups are now testing fully autonomous vessels in Norwegian fjords, with commercial operations expected to begin within two years.' }], markDefs: [] }],
  },
  {
    title: 'What International VCs Get Wrong About Investing in Norway',
    slug: 'international-vcs-norway-mistakes',
    category: 'Investors',
    excerpt: 'Common misconceptions that lead foreign investors to miss the best deals — and how to avoid them.',
    readTime: '6 min read',
    publishedAt: '2025-06-20T09:00:00Z',
    tags: ['Venture Capital', 'International', 'Investors'],
    body: [{ _type: 'block', _key: 'j1', style: 'normal', children: [{ _type: 'span', _key: 'j1s1', text: 'International venture capitalists are increasingly looking north, but many arrive with assumptions shaped by Silicon Valley or London that simply don\'t apply in Norway. Understanding these differences is the key to finding the best opportunities.' }], markDefs: [] }, { _type: 'block', _key: 'j2', style: 'h2', children: [{ _type: 'span', _key: 'j2s1', text: 'Mistake #1: Confusing Quiet with Slow' }], markDefs: [] }, { _type: 'block', _key: 'j3', style: 'normal', children: [{ _type: 'span', _key: 'j3s1', text: 'Norwegian founders rarely shout about their progress. A company that seems quiet on social media may be signing enterprise contracts at impressive speed. Due diligence here requires more legwork — and the rewards are worth it.' }], markDefs: [] }],
  },
]

async function seed() {
  console.log('Creating 10 blog posts...')
  for (const post of posts) {
    const { slug, ...fields } = post
    await client.create({
      _type: 'post',
      ...fields,
      slug: { _type: 'slug', current: slug },
    })
    console.log(`✓ Created: ${post.title}`)
  }
  console.log('Done!')
}

seed().catch(console.error)
