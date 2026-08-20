import type { GlobalConfig } from 'payload'

import { globalTag } from '@/lib/cache'
import { revalidateGlobal } from '@/hooks/revalidate'

const Sobre: GlobalConfig = {
  slug: 'sobre',
  hooks: {
    afterChange: [revalidateGlobal([globalTag('sobre')])],
  },
  label: 'Página A-Vinicola',
  access: {
    read: () => true,
  },
  fields: [
    { name: 'titulo', type: 'text', localized: true },
    { name: 'textoBotao', type: 'text' },
    { name: 'linkBotao', type: 'text' },
    { name: 'descricao', type: 'richText', localized: true },
    { name: 'chamada', type: 'richText', localized: true },
    {
      name: 'banner',
      type: 'upload',
      relationTo: 'media',
      localized: true,
      admin: { description: 'Tamanho: 1920x1080' },
    },
    {
      name: 'video',
      type: 'upload',
      relationTo: 'media',
      localized: true,
      admin: { description: 'Tamanho: 682x323' },
    },
    {
      name: 'fundoVideo',
      type: 'upload',
      relationTo: 'media',
      localized: true,
    },
    {
      name: 'legado',
      type: 'group',
      fields: [
        {
          name: 'banner',
          type: 'upload',
          relationTo: 'media',
          admin: { description: 'Tamanho: 1804x520' },
        },
        { name: 'titulo', type: 'text' },
        { name: 'textoBotao', type: 'text' },
        { name: 'linkBotao', type: 'text' },
        { name: 'texto', type: 'richText' },
        {
          name: 'lista',
          type: 'array',
          fields: [
            {
              name: 'imagem',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Tamanho: 571x508' },
            },
            { name: 'descricao', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'estrutura',
      type: 'group',
      localized: true,
      fields: [
        { name: 'titulo', type: 'text', localized: true },
        {
          name: 'lista',
          type: 'array',
          localized: true,
          fields: [
            {
              name: 'icone',
              type: 'upload',
              relationTo: 'media',
              localized: true,
              admin: { description: 'Sem tamanho padrão' },
            },
            { name: 'titulo', type: 'text', localized: true },
            { name: 'descricao', type: 'richText', localized: true },
          ],
        },
      ],
    },
    {
      name: 'secaoBanner',
      type: 'group',
      localized: true,
      fields: [
        { name: 'titulo', type: 'text', localized: true },
        { name: 'descricao', type: 'text', localized: true },
        { name: 'botao', type: 'text', localized: true },
        { name: 'textoBotao', type: 'text', localized: true },
        {
          name: 'imagem',
          type: 'upload',
          relationTo: 'media',
          localized: true,
          admin: { description: '1552x487' },
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
        },
        {
          name: 'descricao',
          type: 'text',
          required: true,
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
        },
      ],
    },
  ],
}
export default Sobre
