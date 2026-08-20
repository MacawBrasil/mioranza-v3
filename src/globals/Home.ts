import type { Block, GlobalConfig } from 'payload'

import { globalTag } from '@/lib/cache'
import { revalidateGlobal } from '@/hooks/revalidate'

const SlidesHero: Block = {
  slug: 'hero', // required
  fields: [
    { name: 'titulo', type: 'text', localized: true },
    { name: 'botao', type: 'text', localized: true },
    { name: 'textoBotao', type: 'text', localized: true },
    { name: 'descricao', type: 'text', localized: true },
  ],
}

const Home: GlobalConfig = {
  slug: 'home',
  hooks: {
    afterChange: [revalidateGlobal([globalTag('home')])],
  },
  label: 'Página Home',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'Slides',
      type: 'blocks',
      localized: true,
      blocks: [
        {
          ...SlidesHero,
          slug: 'image_slide',
          labels: {
            singular: 'Imagem',
            plural: 'Imagens',
          },
          fields: [
            {
              name: 'banner',
              localized: true,
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Tamanho padrão para imagem e video:1920x1080',
              },
            },
            ...SlidesHero.fields,
          ],
        },
        {
          ...SlidesHero,
          slug: 'video_slide',
          labels: {
            singular: 'Vídeo',
            plural: 'Vídeos',
          },
          fields: [
            { name: 'ativarTexto', type: 'checkbox', localized: true },
            {
              name: 'video',
              label: 'Vídeo',
              type: 'upload',
              relationTo: 'media',
              required: true,
              localized: true,
            },
            ...SlidesHero.fields,
          ],
        },
      ],
    },
    {
      name: 'enoturismo',
      type: 'group',
      localized: true,
      fields: [
        { name: 'titulo', type: 'text', localized: true },
        { name: 'descricao', type: 'richText', localized: true },
        { name: 'linkBotao', type: 'text', localized: true },
        { name: 'textoBotao', type: 'text', localized: true },
        {
          name: 'imagem',
          type: 'upload',
          localized: true,
          relationTo: 'media',
          admin: { description: '844x870' },
        },
        {
          name: 'video',
          type: 'upload',
          relationTo: 'media',
          localized: true,
          admin: { description: 'Tamanho: 640x358' },
        },
        {
          name: 'fundoVideo',
          type: 'upload',
          localized: true,
          relationTo: 'media',
          admin: { description: 'Tamanho: 640x358' },
        },
      ],
    },
    {
      name: 'destaques',
      type: 'relationship',
      relationTo: 'products',
      localized: true,
    },
    { name: 'imagem', type: 'upload', relationTo: 'media', localized: true },
    {
      name: 'secaoDiferenciais',
      type: 'group',
      localized: true,
      fields: [
        { name: 'titulo', type: 'text', localized: true },
        {
          name: 'diferenciais',
          type: 'array',
          localized: true,
          fields: [
            { name: 'titulo', type: 'richText', localized: true },
            {
              name: 'imagem',
              type: 'upload',
              relationTo: 'media',
              localized: true,
              admin: { description: 'Tamanho: 110x110' },
            },
          ],
        },
      ],
    },
    {
      name: 'secaoQuemSomos',
      type: 'group',
      localized: true,
      fields: [
        { name: 'titulo', type: 'text', localized: true },
        { name: 'descicao', type: 'richText', localized: true },
        { name: 'botao', type: 'text', localized: true },
        { name: 'textoBotao', type: 'text', localized: true },
        {
          name: 'imagem1',
          type: 'upload',
          localized: true,
          relationTo: 'media',
          admin: { description: '390x390' },
        },
        {
          name: 'video',
          type: 'upload',
          relationTo: 'media',
          localized: true,
          admin: { description: 'Tamanho: 960x390' },
        },
        {
          name: 'fundoVideo',
          type: 'upload',
          relationTo: 'media',
          localized: true,
        },
        {
          name: 'imagem2',
          type: 'upload',
          relationTo: 'media',
          localized: true,
          admin: { description: '230x230' },
        },
        {
          name: 'imagem3',
          type: 'upload',
          localized: true,
          relationTo: 'media',
          admin: { description: '390x576' },
        },
        {
          name: 'imagem4',
          type: 'upload',
          relationTo: 'media',
          localized: true,
          admin: { description: '390x390' },
        },
      ],
    },
    {
      name: 'secaoBlog',
      type: 'group',
      localized: true,
      fields: [
        { name: 'titulo', type: 'text', localized: true },
        { name: 'descricao', type: 'richText', localized: true },
        { name: 'botao', type: 'text', localized: true },
        { name: 'textoBotao', type: 'text', localized: true },
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
          localized: true,
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
          localized: true,
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Imagem de compartilhamento - Sem tamanho padrao',
        },
      ],
    },
  ],
}

export default Home
