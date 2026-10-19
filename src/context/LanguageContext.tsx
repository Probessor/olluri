'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import translations, { type Lang } from '@/lib/translations'

type LanguageContextType = {
  lang: Lang
  t: typeof translations['no']
  toggle: () => void
}

const LanguageContext = createContext<LanguageContextType | null>(null)

// English is temporarily disabled site-wide. Flip to true (and the toggle
// button in Nav.tsx back on) to bring it back — translations are untouched.
export const ENABLE_ENGLISH = false

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('no')

  useEffect(() => {
    if (!ENABLE_ENGLISH) return
    const saved = localStorage.getItem('lang') as Lang | null
    if (saved === 'en' || saved === 'no') setLang(saved)
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const toggle = () => {
    if (!ENABLE_ENGLISH) return
    setLang(prev => {
      const next = prev === 'no' ? 'en' : 'no'
      localStorage.setItem('lang', next)
      return next
    })
  }

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang], toggle }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
