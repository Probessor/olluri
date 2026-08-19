import * as cheerio from 'cheerio'
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'abo9hzxk',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const PROGRAM_URL = 'https://www.oiw.no/program'
const MONTHS = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 }

async function fetchProgramHtml() {
  const res = await fetch(PROGRAM_URL, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; SidelengsBot/1.0)' },
  })
  if (!res.ok) throw new Error(`OIW fetch failed: ${res.status}`)
  return res.text()
}

function buildDayDateMap($, html) {
  const yearMatch = html.match(/Oslo Innovation Week (\d{4})/)
  const year = yearMatch ? parseInt(yearMatch[1], 10) : new Date().getFullYear()

  const map = {}
  $('label.fs-radio_field').each((_, el) => {
    const dayName = $(el).find('.fs-radio_label.w-form-label').first().text().trim()
    const dateLabel = $(el).find('.fs-radio_label.is-small').text().trim() // e.g. "19 Oct"
    if (!dayName || !dateLabel) return
    const [dom, monAbbr] = dateLabel.split(' ')
    const month = MONTHS[monAbbr]
    if (month === undefined) return
    map[dayName] = `${year}-${String(month + 1).padStart(2, '0')}-${String(dom).padStart(2, '0')}`
  })
  return map
}

function toEventDoc($, el, dayDateMap) {
  const $el = $(el)
  const href = $el.find('.event_item_link').attr('href')
  const rawTitle = $el.find('.event_title').first().text().trim()
  const day = $el.find('[fs-list-field="day"]').first().text().trim()
  const location = $el.find('[fs-list-field="location"]').first().text().trim()
  const date = dayDateMap[day]

  if (!rawTitle || !date || !href) return null

  const title = /^oiw/i.test(rawTitle) ? rawTitle : `OIW: ${rawTitle}`
  const link = new URL(href, 'https://www.oiw.no').toString()
  const slug = href.replace(/^\/event\//, '').replace(/\/$/, '')

  return {
    _id: `oiw-${slug}`,
    _type: 'event',
    title,
    date,
    ...(location ? { location } : {}),
    link,
  }
}

async function main() {
  const html = await fetchProgramHtml()
  const $ = cheerio.load(html)
  const dayDateMap = buildDayDateMap($, html)

  const today = new Date().toISOString().slice(0, 10)
  const items = $('.event_item').toArray()
  const docs = items
    .map(el => toEventDoc($, el, dayDateMap))
    .filter(doc => doc && doc.date >= today)

  console.log(`Found ${docs.length} upcoming OIW events (of ${items.length} listed).`)

  for (const doc of docs) {
    await client.createOrReplace(doc)
    console.log(`✓ ${doc.date}  ${doc.title}`)
  }

  console.log('Done!')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
