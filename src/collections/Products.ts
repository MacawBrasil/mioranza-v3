import type { CollectionConfig } from 'payload'

import { slugField } from '@/fields/slug'
import { collectionTag } from '@/lib/cache'
import { revalidateCollection, revalidateCollectionDelete } from '@/hooks/revalidate'

const Products: CollectionConfig = {
  slug: 'products',
  hooks: {
    afterChange: [revalidateCollection([collectionTag('products')])],
    afterDelete: [revalidateCollectionDelete([collectionTag('products')])],
  },
  admin: {
    useAsTitle: 'slug',
  },
  labels: {
    plural: 'Produtos',
    singular: 'Produto',
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: 'categoria',
      type: 'relationship',
      relationTo: 'productCategory',
      hasMany: true,
    },
    {
      name: 'Subcategoria',
      type: 'relationship',
      relationTo: 'productSubCategory',
      hasMany: true,
    },
    { name: 'destaque', type: 'checkbox', localized: true },
    {
      name: 'imagemHero',
      type: 'upload',
      relationTo: 'media',
      localized: true,
      admin: { description: 'Tamanho: 365x817' },
    },
    {
      name: 'imagemFundoHero',
      type: 'upload',
      relationTo: 'media',
      localized: true,
      admin: { description: 'Tamanho: 634x480' },
    },
    {
      name: 'imagemFundo',
      type: 'upload',
      relationTo: 'media',
      localized: true,
      admin: { description: 'Tamanho: 435x659' },
    },
    {
      name: 'thumb',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Tamanho: 183x609' },
    },
    { name: 'titulo', type: 'text', localized: true },
    { name: 'tipo', type: 'text', localized: true },
    { name: 'chamada', type: 'richText', localized: true },
    { name: 'descricao', type: 'text', localized: true },
    { name: 'link', type: 'text', localized: true },
    {
      name: 'secaoHarmonizacao',
      type: 'group',
      localized: true,
      fields: [
        { name: 'titulo', type: 'text', localized: true },
        {
          name: 'harmonizacoes',
          type: 'array',
          localized: true,
          fields: [
            {
              name: 'imagem',
              type: 'upload',
              relationTo: 'media',
              localized: true,
              admin: { description: 'Sem tamanho padrão' },
            },
            { name: 'titulo', type: 'text', localized: true },
          ],
        },
      ],
    },
    {
      name: 'banner',
      type: 'upload',
      relationTo: 'media',
      localized: true,
      admin: { description: 'Tamanho: 1931x826' },
    },
    {
      name: 'sobre',
      type: 'group',
      label: 'Secao sobre e caracteristicas',
      localized: true,
      fields: [
        { name: 'titulo', type: 'text', localized: true },
        { name: 'descricao', type: 'text', localized: true },
        {
          name: 'caracteristicas',
          type: 'array',
          localized: true,
          fields: [
            { name: 'titulo', type: 'text', localized: true },
            { name: 'descricao', type: 'richText', localized: true },
          ],
        },
        {
          name: 'imagemCaracteristicas',
          type: 'upload',
          relationTo: 'media',
          localized: true,
          admin: { description: 'Tamanho: 623x800' },
        },
      ],
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

export default Products
