import type { GlobalConfig } from 'payload'

import { ALL_CONTENT_TAGS } from '@/lib/cache'
import { revalidateGlobal } from '@/hooks/revalidate'

const Settings: GlobalConfig = {
  slug: 'settings',
  // Header/footer aparecem em todas as páginas → invalida tudo.
  hooks: {
    afterChange: [revalidateGlobal(ALL_CONTENT_TAGS)],
  },
  label: 'Configuracoes',
  access: {
    read: () => true,
  },
  fields: [
    { name: 'favicon', type: 'upload', relationTo: 'media', localized: true },
    { name: 'selo', type: 'upload', relationTo: 'media', localized: true },
    {
      name: 'destinatarios',
      localized: true,
      type: 'array',
      fields: [{ name: 'email', type: 'email', localized: true }],
    },
    { name: 'email', type: 'email', localized: true },
    { name: 'endereco', type: 'richText', localized: true },
    { name: 'telefone', type: 'text', localized: true },
    { name: 'whatsapp', type: 'text', localized: true },
    { name: 'mapa', type: 'text', localized: true },
    { name: 'loja', type: 'text', localized: true },
    { name: 'politicaPrivacidade', type: 'text', localized: true },
    { name: 'politicaCookies', type: 'text', localized: true },
    { name: 'catalogo', type: 'text', localized: true },
    { name: 'fichasTecnicas', type: 'text', localized: true },
    { name: 'cnpj', type: 'text', localized: true },
    {
      name: 'redes',
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'link',
          type: 'text',
          localized: true,
        },
        { name: 'icone', type: 'upload', relationTo: 'media', localized: true },
      ],
    },
  ],
}

export default Settings
