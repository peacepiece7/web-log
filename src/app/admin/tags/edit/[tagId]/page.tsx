import { LogsResponse, TagResponse, ThumbnailResponse } from '@/type'
import FirebaseCollection from '@/service/Firebase/collection'
import TagEditForm from '@/components/TagEditForm'

type Props = {
  params: {
    tagId: string
  }
}
export default async function EditTag({ params }: Props) {
  const db = new FirebaseCollection()
  const logs = await db.getDocs<LogsResponse>('logs')
  const tag = await db.getDoc<TagResponse>('tags', params.tagId)
  const thumb = await db.getDoc<ThumbnailResponse>('thumbnails', tag.thumbnailId)

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
