import createImageUrlBuilder from '@sanity/image-url'
import { client } from './client'

const imageBuilder = createImageUrlBuilder(client)

// Note: deliberately no .fit('crop') here. Sanity's CDN silently ignores a
// manually-drawn crop `rect` when `fit=crop` is requested without an
// explicit height — it falls back to the full, uncropped image instead.
// Every image on this site is requested width-only, so omitting fit('crop')
// is what makes Studio crops actually show up.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const urlForImage = (source: any) =>
  imageBuilder.image(source).auto('format')

interface CroppableImage {
  asset?: { metadata?: { dimensions?: { width?: number; height?: number } } }
  crop?: { top?: number; bottom?: number; left?: number; right?: number } | null
}

// Aspect ratio (width / height) of the region a Studio crop selects, so
// layout can match it instead of forcing a fixed box that fights the crop.
export function getCroppedAspectRatio(image?: CroppableImage | null): number | null {
  const width = image?.asset?.metadata?.dimensions?.width
  const height = image?.asset?.metadata?.dimensions?.height
  if (!width || !height) return null

  const crop = image?.crop
  const croppedWidth = width * (1 - (crop?.left ?? 0) - (crop?.right ?? 0))
  const croppedHeight = height * (1 - (crop?.top ?? 0) - (crop?.bottom ?? 0))
  if (!croppedWidth || !croppedHeight) return null

  return croppedWidth / croppedHeight
}
