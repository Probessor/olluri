import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'message',
  title: 'Message',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', readOnly: true }),
    defineField({ name: 'email', title: 'Email', type: 'string', readOnly: true }),
    defineField({ name: 'reason', title: 'Reason', type: 'string', readOnly: true }),
    defineField({ name: 'role', title: 'Role', type: 'string', readOnly: true }),
    defineField({ name: 'message', title: 'Message', type: 'text', rows: 5, readOnly: true }),
    defineField({ name: 'submittedAt', title: 'Submitted At', type: 'datetime', readOnly: true }),
    defineField({ name: 'isRead', title: 'Read', type: 'boolean', initialValue: false }),
  ],
  orderings: [
    { title: 'Newest first', name: 'submittedAtDesc', by: [{ field: 'submittedAt', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'name', subtitle: 'email', isRead: 'isRead' },
    prepare: ({ title, subtitle, isRead }) => ({
      title: `${isRead ? '' : '🔵 '}${title || '(no name)'}`,
      subtitle,
    }),
  },
})
