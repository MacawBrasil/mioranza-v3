import type { Block, GlobalConfig } from 'payload'

import { globalTag } from '@/lib/cache'
import { revalidateGlobal } from '@/hooks/revalidate'

const EpisodioBlock: Block = {
  slug: 'espisodioBlock', // required
  fields: [
    { name: 'titulo', type: 'text', localized: true },
    { name: 'chamada', type: 'text', localized: true },
    {
      name: 'capa',
      type: 'upload',
      localized: true,
      relationTo: 'media',
    },
  ],
}

const Legado: GlobalConfig = {
  slug: 'legado',
  hooks: {
    afterChange: [revalidateGlobal([globalTag('legado')])],
  },
  label: 'Pagina nosso legado',
  access: {
    read: () => true,
  },
  fields: [
    { name: 'titulo', type: 'text', localized: true },
    { name: 'chamada', type: 'richText', localized: true },
    {
      name: 'slidesOrigem',
      type: 'array',
      localized: true,
      fields: [
        { name: 'titulo', type: 'text', localized: true },
        { name: 'descricao', type: 'richText', localized: true },
        {
          name: 'imagem',
          type: 'upload',
          localized: true,
          relationTo: 'media',
        },
        { name: 'anoOrigem', type: 'text', localized: true },
      ],
    },
    {
      name: 'secaoMomentos',
      type: 'group',
      fields: [
        { name: 'titulo', type: 'text', localized: true },
        { name: 'chamada', type: 'text', localized: true },
        { name: 'descricao', type: 'text', localized: true },
        {
          name: 'slidesMomentos',
          type: 'array',
          localized: true,
          fields: [
            {
              name: 'imagem',
              type: 'upload',
              localized: true,
              relationTo: 'media',
            },
          ],
        },
      ],
    },
    {
      name: 'secaoOnline',
      type: 'group',
      fields: [
        { name: 'titulo', type: 'text', localized: true },
        { name: 'chamada', type: 'text', localized: true },
        { name: 'descricao', type: 'text', localized: true },
        {
          name: 'episodios',
          type: 'blocks',
          localized: true,
          blocks: [
            {
              ...EpisodioBlock,
              slug: 'url_episodio',
              labels: {
                singular: 'Url',
                plural: 'URls',
              },
              fields: [
                {
                  name: 'url',
                  localized: true,
                  type: 'text',
                },
                ...EpisodioBlock.fields,
              ],
            },
            {
              ...EpisodioBlock,
              slug: 'video_episodio',
              labels: {
                singular: 'Vídeo',
                plural: 'Vídeos',
              },
              fields: [
                {
                  name: 'video',
                  label: 'Vídeo',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                  localized: true,
                },
                ...EpisodioBlock.fields,
              ],
            },
          ],
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

export default Legado
