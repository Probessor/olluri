import { createClient } from '@sanity/client'
import * as cheerio from 'cheerio'

const client = createClient({
  projectId: 'abo9hzxk',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// Mesh's WordPress site (The Events Calendar plugin) tags events per-location
// via top-level categories rather than a "city" field: "eventsoslo" (Oslo) and
// "digsevents" (Trondheim, branded "Digs"). Verified these match the event
// lists on meshcommunity.com/oslo/program and meshcommunity.com/trondheim/program.
const LOCATIONS = [
  { city: 'Oslo', categoryId: 154 },
  { city: 'Trondheim', categoryId: 8 },
]

const API_BASE = 'https://meshcommunity.com/wp-json/tribe/events/v1/events'

async function fetchCityEvents(categoryId) {
  const events = []
  let page = 1
  while (true) {
    const url = `${API_BASE}?categories=${categoryId}&per_page=50&start_date=today&page=${page}`
    const res = await fetch(url)
    if (!res.ok) throw new Error(`Mesh fetch failed (category ${categoryId}, page ${page}): ${res.status}`)
    const json = await res.json()
    events.push(...json.events)
    if (page >= (json.total_pages || 1)) break
    page++
  }
  return events
}

function decodeHtmlEntities(str) {
  return cheerio.load(`<div>${str}</div>`)('div').text()
}

function toEventDoc(ev, cityFallback) {
  const title = decodeHtmlEntities(ev.title).trim()
  const date = ev.start_date.slice(0, 10)
  const location = ev.venue?.city || ev.venue?.venue || cityFallback

  return {
    _id: `mesh-${ev.id}`,
    _type: 'event',
    title,
    date,
    location,
    link: ev.url,
    source: 'Mesh',
  }
}

async function main() {
  let total = 0
  for (const { city, categoryId } of LOCATIONS) {
    const events = await fetchCityEvents(categoryId)
    console.log(`Found ${events.length} upcoming Mesh ${city} events.`)
    for (const ev of events) {
      const doc = toEventDoc(ev, city)
      await client.createOrReplace(doc)
      console.log(`✓ ${doc.date}  ${doc.title}`)
      total++
    }
  }
  console.log(`Done! ${total} Mesh events upserted.`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
