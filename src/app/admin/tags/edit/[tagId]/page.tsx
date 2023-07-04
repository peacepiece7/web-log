import { LogsResponse, TagResponse, ThumbnailResponse } from '@/type'
import TagEditForm from '@/components/TagEditForm'
import { getDocCache, getDocsCache } from '@/service/Firebase_fn/collection'

type Props = {
  params: {
    tagId: string
  }
}
export default async function EditTag({ params }: Props) {
  const { logs } = await getDocsCache<LogsResponse>('logs')
  const tag = await getDocCache<TagResponse>('tags', params.tagId)
  const thumb = await getDocCache<ThumbnailResponse>('thumbnails', tag.thumbnailId)

  return (
    <div className='max-w-7xl m-auto'>
      <h1>Admin Edit Tag</h1>
      <TagEditForm
        logs={logs}
        tag={tag}
        thumb={thumb}
      />
    </div>
  )
}
