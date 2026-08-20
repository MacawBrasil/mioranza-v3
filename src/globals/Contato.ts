import type { GlobalConfig } from 'payload'

import { globalTag } from '@/lib/cache'
import { revalidateGlobal } from '@/hooks/revalidate'

const Contato: GlobalConfig = {
  slug: 'contato',
  hooks: {
    afterChange: [revalidateGlobal([globalTag('contato')])],
  },
  label: 'Página Contato',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'banner',
      type: 'upload',
      relationTo: 'media',
      localized: true,
      admin: { description: 'Tamanho: 1920x560' },
    },
    { name: 'titulo', type: 'text', localized: true },
    { name: 'description', type: 'text', localized: true },
    { name: 'texto', type: 'text', localized: true },
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
        { name: 'palavrasChave', type: 'text', required: true },
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
export default Contato
