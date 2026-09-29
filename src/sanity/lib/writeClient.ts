import { createClient } from 'next-sanity'

// Server-only client — never import this from a 'use client' component.
// SANITY_API_TOKEN has no NEXT_PUBLIC_ prefix, so Next.js keeps it out of
// the browser bundle, but it must still only be reached from server code
// (API routes, server components).
export const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})
