import { TagsResponse, ThumbnailsResponse } from '@/type'
import TagsList from '@/components/TagsList'
import { getDocsCache } from '@/service/Firebase_fn/collection'

export default async function tag() {
  const { tags } = await getDocsCache<TagsResponse>('tags')
  const { thumbnails } = await getDocsCache<ThumbnailsResponse>('thumbnails')

  return (
    <div className='max-w-7xl m-auto'>
      <h1 className='mb-20'>Admin Tags</h1>
      <TagsList
        tags={tags}
        thumbs={thumbnails}
      />
    </div>
  )
}
