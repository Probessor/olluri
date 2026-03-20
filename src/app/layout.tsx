import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { LanguageProvider } from '@/context/LanguageContext'

export const metadata: Metadata = {
  title: 'Bess — Nordic Startup Scout',
  description: "Bess connects Norway's most promising founders with the world's best investors. Startup scout, ecosystem connector, and your guide to Norwegian innovation.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="no">
      <body>
        <LanguageProvider>
          <Nav />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}
