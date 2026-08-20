import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'

import { globalTag, type GlobalSlug } from '@/lib/cache'
import type { Locale } from '@/lib/locale'
import type {
  Blog,
  Contato,
  Download,
  Enoturismo,
  Home,
  Legado,
  Produto,
  Setting,
  Sobre,
} from '@/payload/payload-types'

async function getGlobal<T>(slug: GlobalSlug, locale?: Locale): Promise<T | null> {
  const cached = unstable_cache(
    async () => {
      try {
        const payload = await getPayload({ config })
        const doc = await payload.findGlobal({
          slug,
          locale,
          depth: 2,
        })
        return (doc as T) || null
      } catch (error: unknown) {
        // Erro silenciosamente ignorado para evitar crash do app
        return null
      }
    },
    ['global', slug, locale ?? 'default'],
    { tags: [globalTag(slug)] },
  )
  return cached()
}

export async function fetchHome(locale: Locale): Promise<Home | null> {
  return getGlobal<Home>('home', locale)
}

export async function fetchLegado(locale: Locale): Promise<Legado | null> {
  return getGlobal<Legado>('legado', locale)
}

export async function fetchSetting(locale?: Locale): Promise<Setting | null> {
  return getGlobal<Setting>('settings', locale)
}

export async function fetchEnoturismo(locale: Locale): Promise<Enoturismo | null> {
  return getGlobal<Enoturismo>('enoturismo', locale)
}

export async function fetchPagProdutos(locale: Locale): Promise<Produto | null> {
  return getGlobal<Produto>('produtos', locale)
}

export async function fetchPagSobre(locale: Locale): Promise<Sobre | null> {
  return getGlobal<Sobre>('sobre', locale)
}

export async function fetchPagDownload(locale: Locale): Promise<Download | null> {
  return getGlobal<Download>('download', locale)
}

export async function fetchPagBlog(locale: Locale): Promise<Blog | null> {
  return getGlobal<Blog>('blog', locale)
}

export async function fetchPagContato(locale: Locale): Promise<Contato | null> {
  return getGlobal<Contato>('contato', locale)
}
