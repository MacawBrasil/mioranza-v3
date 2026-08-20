import { revalidateTag } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload'

/**
 * Invalida as tags de cache informadas. Envolto em try/catch porque
 * `revalidateTag` só é válido dentro do runtime do Next — em contextos fora
 * de request (seed/scripts) ele lança, e não queremos derrubar o save.
 */
const bust = (tags: string[]): void => {
  for (const tag of tags) {
    try {
      revalidateTag(tag)
    } catch {
      // fora do runtime do Next (ex.: seed) — ignora
    }
  }
}

/** Hook `afterChange` de collection que revalida as tags informadas. */
export const revalidateCollection =
  (tags: string[]): CollectionAfterChangeHook =>
  ({ doc }) => {
    bust(tags)
    return doc
  }

/** Hook `afterDelete` de collection que revalida as tags informadas. */
export const revalidateCollectionDelete =
  (tags: string[]): CollectionAfterDeleteHook =>
  ({ doc }) => {
    bust(tags)
    return doc
  }

/** Hook `afterChange` de global que revalida as tags informadas. */
export const revalidateGlobal =
  (tags: string[]): GlobalAfterChangeHook =>
  ({ doc }) => {
    bust(tags)
    return doc
  }
