import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Startup', value: 'Startup' },
          { title: 'Investor', value: 'Investor' },
          { title: 'Community', value: 'Community' },
          { title: 'News', value: 'News' },
          { title: 'Other', value: 'Other' },
          { title: 'Blog', value: 'Blog' },
        ],
        layout: 'radio',
      },
    }),
    defineField({ name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' } }),
    defineField({ name: 'startupName', title: 'Startup navn', type: 'string' }),
    defineField({ name: 'interviewed', title: 'Intervjuobjekt(er)', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' } }),
    defineField({ name: 'intervieweeTitles', title: 'Intervjuobjektenes titler (f.eks. CEO)', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' } }),
    defineField({ name: 'startupWebsite', title: 'Startup nettside', type: 'url' }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3 }),
    defineField({ name: 'publishedAt', title: 'Published At', type: 'datetime' }),
    defineField({ name: 'readTime', title: 'Read Time (e.g. "5 min read")', type: 'string' }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt text', type: 'string' }),
      ],
    }),
    defineField({
      name: 'startupLogo',
      title: 'Startup logo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt text', type: 'string' }),
      ],
    }),
    defineField({ name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }] }),
  ],
  preview: { select: { title: 'title', subtitle: 'publishedAt', media: 'mainImage' } },
})
