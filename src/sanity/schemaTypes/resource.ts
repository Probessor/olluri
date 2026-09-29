import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'resource',
  title: 'Resource',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'url', title: 'URL', type: 'url', validation: r => r.required() }),
    defineField({ name: 'icon', title: 'Icon (emoji)', type: 'string' }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Funding', value: 'Funding' },
          { title: 'Entreprenørskap', value: 'Entreprenørskap' },
          { title: 'Problemløsing', value: 'Problemløsing' },
          { title: 'Maler og dokumenter', value: 'Maler og dokumenter' },
          { title: 'Annet', value: 'Annet' },
        ],
        layout: 'radio',
      },
      validation: r => r.required(),
    }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
  ],
  orderings: [
    {
      title: 'Category, then order',
      name: 'categoryOrder',
      by: [
        { field: 'category', direction: 'asc' },
        { field: 'order', direction: 'asc' },
      ],
    },
  ],
  preview: { select: { title: 'title', subtitle: 'category' } },
})
