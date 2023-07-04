import 'server-only'
import { getDocsCache } from '../Firebase_fn/collection'
import { getContentDataCache } from '../Firebase_fn/storage'

type CollectionName = 'logs' | 'tags' | 'thumbnails'
type Collections = CollectionName[]

export const getFetcher = async (...collections: Collections) => {
  if (process.env.NODE_ENV === 'development') {
    const apis = collections.map((collection) => {
      return fetch(`http://localhost:3000/api/get/${collection}`)
    })
    const responses = await Promise.all(apis)
    return Promise.all(responses.map((res) => res.json()))
  }

  const apis = collections.map((collection) => {
    return getDocsCache(collection)
  })
  return Promise.all(apis)
}

export const getContentFetcher = async (productId: string) => {
  if (process.env.NODE_ENV === 'development') {
    const response = await fetch(`http://localhost:3000/api/get/content?productId=${productId}`)
    return response.json()
  }

  return getContentDataCache(productId)
}
