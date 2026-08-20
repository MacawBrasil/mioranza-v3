import type { Media } from '@/payload/payload-types'

export function FormatImage(file: Media | string): Media {
  const url = file as Media
  return url
}
