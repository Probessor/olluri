import type { StructureResolver } from 'sanity/structure'
import { MessagesIcon } from './components/MessagesIcon'

export const structure: StructureResolver = S =>
  S.list()
    .title('Content')
    .items([
      ...S.documentTypeListItems().filter(item => item.getId() !== 'message'),
      S.documentTypeListItem('message')
        .title('Message')
        .icon(MessagesIcon)
        .child(
          S.documentTypeList('message')
            .title('Messages')
            .defaultOrdering([
              { field: 'isRead', direction: 'asc' },
              { field: 'submittedAt', direction: 'desc' },
            ])
        ),
    ])
