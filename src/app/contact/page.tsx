'use client'
import { useState, type FormEvent } from 'react'
import { useLanguage } from '@/context/LanguageContext'

const REASONS = [
  'Jeg har spørsmål',
  'Jeg har noe å dele',
  'Jeg ønsker å samarbeide',
  'Annet',
]

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactPage() {
  const { t } = useLanguage()
  const c = t.contact
  const [reason, setReason] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, reason, role, message }),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('success')
      setName(''); setEmail(''); setReason(''); setRole(''); setMessage('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="label">{c.label}</span>
          <h1>{c.h1}</h1>
          <p className="lead" style={{ marginTop: 12, marginBottom: 0 }}>
            {c.lead}
          </p>
        </div>
      </div>

      <section className="section" style={{ background: 'var(--white)', paddingTop: 'var(--gap-md)' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'start' }}>
            <div>
              <h2>{c.sendMessage}</h2>
              <div className="divider" />
              <form style={{ marginTop: 'var(--gap-md)' }} onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="reason">Hva gjelder det?</label>
                  <select id="reason" name="reason" value={reason} onChange={e => setReason(e.target.value)}>
                    <option value="">Velg et alternativ</option>
                    {REASONS.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="name">{c.yourName}</label>
                  <input id="name" name="name" type="text" placeholder="Ola Nordmann" value={name} onChange={e => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">{c.emailAddress}</label>
                  <input id="email" name="email" type="email" placeholder="ola@startup.no" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="role">{c.iAmA}</label>
                  <select id="role" name="role" value={role} onChange={e => setRole(e.target.value)}>
                    <option value="">{c.selectRole}</option>
                    {c.roles.map(r => <option key={r}>{r}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="message">{c.message}</label>
                  <textarea id="message" name="message" placeholder={c.messagePlaceholder} value={message} onChange={e => setMessage(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary w-full" style={{ justifyContent: 'center' }} disabled={status === 'submitting'}>
                  {status === 'submitting' ? c.sending : c.sendBtn}
                </button>
                {status === 'success' && (
                  <p style={{ marginTop: 12, color: 'var(--teal)', fontSize: '0.9rem', fontWeight: 500 }}>{c.successMsg}</p>
                )}
                {status === 'error' && (
                  <p style={{ marginTop: 12, color: '#b91c1c', fontSize: '0.9rem', fontWeight: 500 }}>{c.errorMsg}</p>
                )}
              </form>
            </div>

            <div style={{ paddingTop: 'var(--gap-sm)' }}>
              <h2>{c.contactDetails}</h2>
              <div className="divider" />
              <div style={{ marginTop: 'var(--gap-md)', display: 'flex', flexDirection: 'column', gap: 'var(--gap-md)' }}>
                {[
                  { icon: '✉️', label: 'Email', value: 'bess@sidelengs.com', href: 'mailto:bess@sidelengs.com' },
                  { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/besart-olluri/', href: '#' },
                  { icon: '📸', label: 'Instagram', value: '@_sidelengs', href: 'https://instagram.com/_sidelengs' },
                  { icon: '📍', label: c.location, value: 'Oslo, Norway', href: undefined },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--teal-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                      {item.icon}
                    </div>
                    <div>
                      <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', fontWeight: 600, marginBottom: 2 }}>{item.label}</p>
                      {item.href
                        ? <a href={item.href} style={{ color: 'var(--primary)', fontWeight: 500 }}>{item.value}</a>
                        : <span style={{ color: 'var(--primary)', fontWeight: 500 }}>{item.value}</span>
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
