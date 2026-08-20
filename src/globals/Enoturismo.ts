import type { GlobalConfig } from 'payload'

import { globalTag } from '@/lib/cache'
import { revalidateGlobal } from '@/hooks/revalidate'

const Enoturismo: GlobalConfig = {
  slug: 'enoturismo',
  hooks: {
    afterChange: [revalidateGlobal([globalTag('enoturismo')])],
  },
  label: 'Página Enoturismo',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'imagem1',
      type: 'upload',
      relationTo: 'media',
      localized: true,
      admin: { description: 'Tamanho: 565x531' },
    },
    {
      name: 'imagem2',
      type: 'upload',
      relationTo: 'media',
      localized: true,
      admin: { description: 'Tamanho: 994x531' },
    },
    {
      name: 'imagem3',
      type: 'upload',
      relationTo: 'media',
      localized: true,
      admin: { description: 'Tamanho: 465x531' },
    },
    {
      name: 'secao',
      type: 'group',
      localized: true,
      fields: [
        { name: 'titulo', type: 'text', localized: true },
        {
          name: 'video',
          type: 'upload',
          relationTo: 'media',
          localized: true,
          admin: { description: 'Tamanho: 1266x600' },
        },
        {
          name: 'fundoVideo',
          type: 'upload',
          relationTo: 'media',
          localized: true,
          admin: { description: '1266x600' },
        },
        {
          name: 'imagem',
          type: 'upload',
          relationTo: 'media',
          localized: true,
          admin: { description: '463x600' },
        },
      ],
    },
    {
      name: 'roteiros',
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'imagem',
          type: 'upload',
          relationTo: 'media',
          localized: true,
          admin: { description: '378x269' },
        },
        {
          name: 'titulo',
          type: 'text',
          localized: true,
        },
        {
          name: 'descricao',
          type: 'text',
          localized: true,
        },
        {
          name: 'linkBotao',
          type: 'text',
          localized: true,
        },
        {
          name: 'lista',
          type: 'array',
          localized: true,
          fields: [{ name: 'titulo', type: 'text' }],
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
          localized: true,
          label: 'Imagem de compartilhamento - Sem tamanho padrao',
        },
      ],
    },
  ],
}
export default Enoturismo
