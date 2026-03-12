import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'hub',
  title: 'Innovation Hub',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'icon', title: 'Icon (emoji)', type: 'string' }),
    defineField({ name: 'city', title: 'City', type: 'string' }),
    defineField({ name: 'focus', title: 'Focus (e.g. "Tech", "Impact")', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
  ],
  preview: { select: { title: 'name', subtitle: 'city' } },
})
