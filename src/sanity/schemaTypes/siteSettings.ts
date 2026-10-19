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
    defineField({
      name: 'businessStats',
      title: 'Næringsstatistikk (vises som egen boks på forsiden)',
      type: 'object',
      fields: [
        defineField({
          name: 'newRegistrations',
          title: 'Rad 1 — Nyregistrerte foretak',
          type: 'object',
          fields: [
            defineField({ name: 'current', title: 'Nyregistrerte foretak 2026', type: 'string' }),
            defineField({ name: 'previous', title: 'Nyregistrerte foretak tilsvarende periode i fjor', type: 'string' }),
            defineField({ name: 'change', title: 'Prosentvis endring', type: 'string' }),
          ],
        }),
        defineField({
          name: 'closures',
          title: 'Rad 2 — Avviklinger av foretak',
          type: 'object',
          fields: [
            defineField({ name: 'current', title: 'Avviklinger av foretak 2026', type: 'string' }),
            defineField({ name: 'previous', title: 'Avviklinger tilsvarende periode 2025', type: 'string' }),
            defineField({ name: 'change', title: 'Prosentvis endring', type: 'string' }),
          ],
        }),
      ],
    }),
    defineField({ name: 'aboutBio', title: 'About Page Bio', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'contactEmail', title: 'Contact Email', type: 'string' }),
    defineField({ name: 'linkedinUrl', title: 'LinkedIn URL', type: 'url' }),
    defineField({ name: 'twitterUrl', title: 'Twitter / X URL', type: 'url' }),
  ],
})
