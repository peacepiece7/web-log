import EditTagForm from '@/components/EditTagForm'
import FirebaseCollection from '@/service/Firebase/collection'
import { LogsResponse, TagResponse, ThumbnailResponse } from '@/type'
import React from 'react'

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
      <h1>Edit Tag</h1>
      <EditTagForm
        logs={logs}
        tag={tag}
        thumb={thumb}
      />
    </div>
  )
}
