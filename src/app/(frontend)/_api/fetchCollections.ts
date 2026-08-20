import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'

import { collectionTag } from '@/lib/cache'
import type { Locale } from '@/lib/locale'
import type { Post, Product, ProductCategory } from '@/payload/payload-types'

interface iFetchPosts {
  id?: string
  locale: Locale
}

export async function fetchProdCategories(locale: Locale): Promise<ProductCategory[]> {
  const cached = unstable_cache(
    async () => {
      try {
        const payload = await getPayload({ config })
        const { docs } = await payload.find({
          collection: 'productCategory',
          locale,
          depth: 2,
          limit: 0,
        })
        return docs
      } catch (error: unknown) {
        // Garante que sempre retornamos um array, mesmo em caso de erro
        return []
      }
    },
    ['prodCategories', locale],
    { tags: [collectionTag('productCategory'), collectionTag('productSubCategory')] },
  )
  return cached()
}

export async function fetchProductsHighlights(locale: Locale): Promise<Product[]> {
  const cached = unstable_cache(
    async () => {
      try {
        const payload = await getPayload({ config })
        const { docs } = await payload.find({
          collection: 'products',
          where: {
            destaque: {
              equals: true,
            },
          },
          locale,
          depth: 2,
          limit: 0,
        })
        return docs
      } catch (error: unknown) {
        return []
      }
    },
    ['productsHighlights', locale],
    { tags: [collectionTag('products')] },
  )
  return cached()
}

export async function fetchProducts(locale: Locale): Promise<Product[]> {
  const cached = unstable_cache(
    async () => {
      try {
        const payload = await getPayload({ config })
        const { docs } = await payload.find({
          collection: 'products',
          locale,
          depth: 2,
          limit: 0,
        })
        return docs
      } catch (error: unknown) {
        return []
      }
    },
    ['products', locale],
    { tags: [collectionTag('products')] },
  )
  return cached()
}

export async function fetchBlogs(locale: Locale): Promise<Post[]> {
  const cached = unstable_cache(
    async () => {
      try {
        const payload = await getPayload({ config })
        const { docs } = await payload.find({
          collection: 'posts',
          locale,
          depth: 2,
          limit: 0,
        })
        return docs
      } catch (error: unknown) {
        return []
      }
    },
    ['posts', locale],
    { tags: [collectionTag('posts')] },
  )
  return cached()
}

export async function fetchProductsWithCategoryID({ id, locale }: iFetchPosts): Promise<Product[]> {
  if (!id) return []
  const cached = unstable_cache(
    async () => {
      try {
        const payload = await getPayload({ config })
        const { docs } = await payload.find({
          collection: 'products',
          where: {
            categoria: {
              equals: id,
            },
          },
          locale,
          depth: 2,
          limit: 0,
        })
        return docs
      } catch (error: unknown) {
        return []
      }
    },
    ['productsWithCategory', id, locale],
    { tags: [collectionTag('products')] },
  )
  return cached()
}

export async function fetchPostsWithCategoryID({ id, locale }: iFetchPosts): Promise<Post[]> {
  if (!id) return []
  const cached = unstable_cache(
    async () => {
      try {
        const payload = await getPayload({ config })
        const { docs } = await payload.find({
          collection: 'posts',
          where: {
            categoria: {
              equals: id,
            },
          },
          locale,
          depth: 2,
          limit: 0,
        })
        return docs
      } catch (error: unknown) {
        return []
      }
    },
    ['postsWithCategory', id, locale],
    { tags: [collectionTag('posts')] },
  )
  return cached()
}
