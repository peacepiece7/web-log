// 서버에서만 발생하도록 보장할 수 있습니다 .
import 'server-only'
import { getDocsCache } from '../Firebase_fn/collection'

type CollectionName = 'logs' | 'tags' | 'thumbnails'
type Collections = CollectionName[]

export const getDocsPreload = (...collections: Collections) => {
  void collections.forEach((name) => {
    getDocsCache(name)
  })
}
