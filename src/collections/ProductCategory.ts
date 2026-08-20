import type { CollectionConfig } from 'payload'

import { collectionTag } from '@/lib/cache'
import { revalidateCollection, revalidateCollectionDelete } from '@/hooks/revalidate'

const ProductCategory: CollectionConfig = {
  slug: 'productCategory',
  hooks: {
    afterChange: [revalidateCollection([collectionTag('productCategory')])],
    afterDelete: [revalidateCollectionDelete([collectionTag('productCategory')])],
  },
  labels: {
    plural: 'Categorias Produto',
    singular: 'Categoria Produto',
  },
  admin: {
    useAsTitle: 'titulo',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'destaque', type: 'checkbox' },
    {
      name: 'cor',
      type: 'text',
      required: true,
      admin: { description: 'Exemplo: #FFFFFF' },
    },
    { name: 'titulo', type: 'text', localized: true },
    {
      name: 'imagem',
      type: 'upload',
      relationTo: 'media',
      localized: true,
      admin: { description: 'Tamanho: 110x413' },
    },
    {
      name: 'SubCateroria',
      type: 'relationship',
      relationTo: 'productSubCategory',
      hasMany: true,
      admin: {
        description:
          'Subcategorias que aparecem sob esta categoria no filtro da página de produtos.',
      },
    },
  ],
}

export default ProductCategory
