import type { CollectionConfig } from 'payload'

import { collectionTag } from '@/lib/cache'
import { revalidateCollection, revalidateCollectionDelete } from '@/hooks/revalidate'

const BlogCategory: CollectionConfig = {
  slug: 'blogCategory',
  hooks: {
    afterChange: [revalidateCollection([collectionTag('blogCategory')])],
    afterDelete: [revalidateCollectionDelete([collectionTag('blogCategory')])],
  },
  labels: {
    plural: 'Categorias Blog',
    singular: 'Categoria Blog',
  },
  admin: {
    useAsTitle: 'titulo',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'titulo', type: 'text', localized: true },
  ],
}

export default BlogCategory
