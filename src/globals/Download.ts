import type { GlobalConfig } from 'payload'

import { globalTag } from '@/lib/cache'
import { revalidateGlobal } from '@/hooks/revalidate'

const Download: GlobalConfig = {
  slug: 'download',
  hooks: {
    afterChange: [revalidateGlobal([globalTag('download')])],
  },
  label: 'Página Download',
  access: {
    read: () => true,
  },
  fields: [
    { name: 'titulo', type: 'text', localized: true },
    { name: 'descricao', type: 'richText', localized: true },
    {
      name: 'imagem',
      type: 'upload',
      relationTo: 'media',
      localized: true,
      admin: { description: '735x585' },
    },
    {
      name: 'catalogoProdutos',
      type: 'group',
      localized: true,
      fields: [
        { name: 'descricao', type: 'text', localized: true },
        { name: 'arquivo', type: 'text', localized: true },
        {
          name: 'icone',
          type: 'upload',
          relationTo: 'media',
          localized: true,
        },
      ],
    },
    {
      name: 'midiaKit',
      type: 'group',
      localized: true,
      fields: [
        { name: 'descricao', type: 'text', localized: true },
        { name: 'icone', type: 'upload', relationTo: 'media', localized: true },
        { name: 'arquivo', type: 'text', localized: true },
      ],
    },
    {
      name: 'imagem2',
      type: 'upload',
      relationTo: 'media',
      admin: { description: '659x607' },
      localized: true,
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
          localized: true,
          label: 'Imagem de compartilhamento - Sem tamanho padrao',
        },
      ],
    },
  ],
}
export default Download
