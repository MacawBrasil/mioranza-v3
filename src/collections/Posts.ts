import type { CollectionConfig } from 'payload'

import { slugField } from '@/fields/slug'
import { collectionTag } from '@/lib/cache'
import { revalidateCollection, revalidateCollectionDelete } from '@/hooks/revalidate'

const Posts: CollectionConfig = {
  slug: 'posts',
  hooks: {
    afterChange: [revalidateCollection([collectionTag('posts')])],
    afterDelete: [revalidateCollectionDelete([collectionTag('posts')])],
  },
  labels: {
    plural: 'Postagens',
    singular: 'Postagem',
  },
  admin: {
    useAsTitle: 'chamada',
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: 'banner',
      type: 'upload',
      relationTo: 'media',
      localized: true,
      admin: { description: 'Tamanho: 1920x603' },
    },
    {
      name: 'thumb',
      type: 'upload',
      relationTo: 'media',
      localized: true,
      admin: { description: 'Tamanho: 400x320' },
    },
    { name: 'chamada', type: 'text', localized: true },
    { name: 'descricao', type: 'text', localized: true },
    { name: 'texto', type: 'richText', localized: true },
    {
      name: 'categoria',
      type: 'relationship',
      relationTo: 'blogCategory',
    },
    {
      name: 'Seo',
      type: 'group',
      localized: true,
      fields: [
        {
          name: 'titulo',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'descricao',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'palavrasChave',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'ImagemCompartilhada',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Imagem de compartilhamento - Sem tamanho padrao',
          localized: true,
        },
      ],
    },
    slugField(),
  ],
}

export default Posts
