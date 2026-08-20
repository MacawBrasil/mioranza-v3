/**
 * Tags de cache usadas para invalidação sob demanda (ISR).
 *
 * As leituras do Payload (`_api/*`) são cacheadas com `unstable_cache` usando
 * estas tags. Os hooks `afterChange`/`afterDelete` das collections/globals
 * chamam `revalidateTag` com a mesma tag, invalidando apenas o conteúdo afetado.
 */

export type GlobalSlug =
  | 'home'
  | 'blog'
  | 'legado'
  | 'contato'
  | 'download'
  | 'enoturismo'
  | 'produtos'
  | 'settings'
  | 'sobre'

export type CollectionSlug =
  | 'posts'
  | 'products'
  | 'productCategory'
  | 'productSubCategory'
  | 'blogCategory'
  | 'media'

/** Tag de um global (ex.: `global_home`). */
export const globalTag = (slug: GlobalSlug | string): string => `global_${slug}`

/** Tag de uma collection (o próprio slug, ex.: `products`). */
export const collectionTag = (slug: CollectionSlug | string): string => slug

const GLOBAL_SLUGS: GlobalSlug[] = [
  'home',
  'blog',
  'legado',
  'contato',
  'download',
  'enoturismo',
  'produtos',
  'settings',
  'sobre',
]

const COLLECTION_SLUGS: CollectionSlug[] = [
  'posts',
  'products',
  'productCategory',
  'productSubCategory',
  'blogCategory',
  'media',
]

/** Todas as tags de conteúdo. Usada quando algo transversal muda (ex.: Media). */
export const ALL_CONTENT_TAGS: string[] = [
  ...GLOBAL_SLUGS.map(globalTag),
  ...COLLECTION_SLUGS.map(collectionTag),
]
