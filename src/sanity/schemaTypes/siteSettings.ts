import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'heroTagline', title: 'Hero Tagline', type: 'string' }),
    defineField({ name: 'heroBio', title: 'Hero Bio', type: 'text', rows: 4 }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'value', title: 'Value (e.g. "120+")', type: 'string' },
          { name: 'label', title: 'Label (e.g. "Startups scouted")', type: 'string' },
        ],
      }],
    }),
    defineField({ name: 'aboutBio', title: 'About Page Bio', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'contactEmail', title: 'Contact Email', type: 'string' }),
    defineField({ name: 'linkedinUrl', title: 'LinkedIn URL', type: 'url' }),
    defineField({ name: 'twitterUrl', title: 'Twitter / X URL', type: 'url' }),
  ],
})
