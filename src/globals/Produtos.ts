import type { GlobalConfig } from 'payload'

import { globalTag } from '@/lib/cache'
import { revalidateGlobal } from '@/hooks/revalidate'

const Produtos: GlobalConfig = {
  slug: 'produtos',
  hooks: {
    afterChange: [revalidateGlobal([globalTag('produtos')])],
  },
  label: 'Página Produtos',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'imagem',
      type: 'upload',
      relationTo: 'media',
      admin: { description: '520x340' },
      localized: true,
    },
    { name: 'titulo', type: 'text', localized: true },
    { name: 'descricao', type: 'richText', localized: true },
    {
      name: 'categorias',
      type: 'relationship',
      relationTo: 'productCategory',
      localized: true,
    },
    {
      name: 'banner',
      type: 'group',
      localized: true,
      fields: [
        {
          name: 'imagem',
          type: 'upload',
          relationTo: 'media',
          admin: { description: '1638x666' },
          localized: true,
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
  ],
}
export default Produtos
