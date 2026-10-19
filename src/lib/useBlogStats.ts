'use client'
import { useEffect, useState } from 'react'
import { client } from '@/sanity/lib/client'
import { blogStatsQuery } from '@/sanity/lib/queries'

export interface BlogStats {
  startupCount: number
  founderCount: number
}

export function useBlogStats() {
  const [stats, setStats] = useState<BlogStats | null>(null)

  useEffect(() => {
    client.fetch(blogStatsQuery)
      .then((data: BlogStats) => setStats(data))
      .catch(() => {})
  }, [])

  return stats
}
