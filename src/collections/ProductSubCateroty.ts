import type { CollectionConfig } from 'payload'

import { collectionTag } from '@/lib/cache'
import { revalidateCollection, revalidateCollectionDelete } from '@/hooks/revalidate'

const ProductSubCategory: CollectionConfig = {
  slug: 'productSubCategory',
  hooks: {
    afterChange: [revalidateCollection([collectionTag('productSubCategory')])],
    afterDelete: [revalidateCollectionDelete([collectionTag('productSubCategory')])],
  },
  labels: {
    plural: 'Sub Categorias Produto',
    singular: 'Sub Categoria Produto',
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

export default ProductSubCategory
