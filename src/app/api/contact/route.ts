import { NextRequest, NextResponse } from 'next/server'
import { writeClient } from '@/sanity/lib/writeClient'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function cleanString(value: unknown, maxLength: number) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Ugyldig forespørsel.' }, { status: 400 })
  }

  const name = cleanString(body.name, 200)
  const email = cleanString(body.email, 200)
  const reason = cleanString(body.reason, 200)
  const role = cleanString(body.role, 200)
  const message = cleanString(body.message, 5000)

  if (!name || !EMAIL_RE.test(email) || !message) {
    return NextResponse.json({ error: 'Navn, gyldig e-post og melding er påkrevd.' }, { status: 400 })
  }

  try {
    await writeClient.create({
      _type: 'message',
      name,
      email,
      reason,
      role,
      message,
      submittedAt: new Date().toISOString(),
      isRead: false,
    })
  } catch (err) {
    console.error('[api/contact] Sanity write failed:', err)
    return NextResponse.json({ error: 'Kunne ikke sende meldingen. Prøv igjen senere.' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
