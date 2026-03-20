'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import translations, { type Lang } from '@/lib/translations'

type LanguageContextType = {
  lang: Lang
  t: typeof translations['no']
  toggle: () => void
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('no')

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Lang | null
    if (saved === 'en' || saved === 'no') setLang(saved)
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const toggle = () => {
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
