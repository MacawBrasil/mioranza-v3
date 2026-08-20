import type { CollectionConfig } from 'payload'

import { ALL_CONTENT_TAGS } from '@/lib/cache'
import { revalidateCollection, revalidateCollectionDelete } from '@/hooks/revalidate'

export const Media: CollectionConfig = {
  slug: 'media',
  hooks: {
    afterChange: [revalidateCollection(ALL_CONTENT_TAGS)],
    afterDelete: [revalidateCollectionDelete(ALL_CONTENT_TAGS)],
  },
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/*', 'video/*'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
  ],
}
