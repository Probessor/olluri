import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'date', title: 'Date', type: 'date' }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'link', title: 'Event link', type: 'url' }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      options: {
        list: [
          { title: 'StartupLab', value: 'StartupLab' },
          { title: 'OIW', value: 'OIW' },
          { title: 'Mesh', value: 'Mesh' },
        ],
      },
    }),
  ],
  preview: { select: { title: 'title', subtitle: 'location' } },
})
