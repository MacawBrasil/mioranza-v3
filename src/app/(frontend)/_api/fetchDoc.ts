import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'

import { collectionTag } from '@/lib/cache'
import type { Locale } from '@/lib/locale'
import type { Config } from '@/payload/payload-types'

export const fetchProduct = async <T>(args: {
  collection: keyof Config['collections']
  slug?: string
  id?: string
  draft?: boolean
  locale: Locale
}): Promise<T | null> => {
  const { slug, locale } = args || {}
  const cached = unstable_cache(
    async () => {
      try {
        const payload = await getPayload({ config })
        const { docs } = await payload.find({
          collection: 'products',
          where: {
            slug: {
              equals: slug,
            },
          },
          locale,
          depth: 2,
          limit: 1,
        })
        return (docs?.[0] as T) || null
      } catch (error: unknown) {
        // Erro silenciosamente ignorado para evitar crash do app
        return null
      }
    },
    ['product', String(slug), locale],
    { tags: [collectionTag('products')] },
  )
  return cached()
}

export const fetchBlog = async <T>(args: {
  collection: keyof Config['collections']
  slug?: string
  id?: string
  draft?: boolean
  locale: Locale
}): Promise<T | null> => {
  const { slug, locale } = args || {}
  const cached = unstable_cache(
    async () => {
      try {
        const payload = await getPayload({ config })
        const { docs } = await payload.find({
          collection: 'posts',
          where: {
            slug: {
              equals: slug,
            },
          },
          locale,
          depth: 2,
          limit: 1,
        })
        return (docs?.[0] as T) || null
      } catch (error: unknown) {
        // Erro silenciosamente ignorado para evitar crash do app
        return null
      }
    },
    ['post', String(slug), locale],
    { tags: [collectionTag('posts')] },
  )
  return cached()
}
