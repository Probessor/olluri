import createImageUrlBuilder from '@sanity/image-url'
import { client } from './client'

const imageBuilder = createImageUrlBuilder(client)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const urlForImage = (source: any) =>
  imageBuilder.image(source).auto('format').fit('max')
