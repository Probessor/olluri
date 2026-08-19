import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'abo9hzxk',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const ELFSIGHT_WIDGET_ID = 'bbccb234-c613-47e4-8f8e-15b9bcb5b5d8'
const SOURCE_PAGE = 'https://www.startuplab.no/events'

async function fetchStartuplabEvents() {
  const url = `https://core.service.elfsight.com/p/boot/?page=${encodeURIComponent(SOURCE_PAGE)}&w=${ELFSIGHT_WIDGET_ID}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Elfsight fetch failed: ${res.status}`)
  const json = await res.json()
  return json.data.widgets[ELFSIGHT_WIDGET_ID].data.settings.events
}

function toEventDoc(ev) {
  const link = ev.actions?.find(a => a.type === 'link')?.link?.value
  const taggedLocation = ev.tags?.[0]?.tagName
    ? ev.tags[0].tagName.charAt(0) + ev.tags[0].tagName.slice(1).toLowerCase()
    : undefined
  const location = taggedLocation || 'Oslo'

  return {
    _id: `startuplab-${ev.id}`,
    _type: 'event',
    title: ev.name,
    date: ev.start.date,
    location,
    city: location,
    source: 'StartupLab',
    ...(link ? { link } : {}),
  }
}

async function main() {
  const events = await fetchStartuplabEvents()
  const today = new Date().toISOString().slice(0, 10)
  const upcoming = events.filter(ev => ev.start.date >= today)

  console.log(`Found ${upcoming.length} upcoming Startuplab events (of ${events.length} total).`)

  for (const ev of upcoming) {
    const doc = toEventDoc(ev)
    await client.createOrReplace(doc)
    console.log(`✓ ${doc.date}  ${doc.title}`)
  }

  console.log('Done!')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
