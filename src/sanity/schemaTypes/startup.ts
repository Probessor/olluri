import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'startup',
  title: 'Startup',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' } }),
    defineField({ name: 'icon', title: 'Icon (emoji)', type: 'string' }),
    defineField({ name: 'tag', title: 'Tag / Category', type: 'string' }),
    defineField({ name: 'sector', title: 'Sector', type: 'string' }),
    defineField({ name: 'city', title: 'City', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
  ],
  preview: { select: { title: 'name', subtitle: 'city' } },
})
