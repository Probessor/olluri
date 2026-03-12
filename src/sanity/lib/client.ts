import { createClient } from 'next-sanity'

export const client = createClient({
  // TODO: Add your Sanity project ID to .env.local as NEXT_PUBLIC_SANITY_PROJECT_ID
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})
