import FirebaseCollection from '@/service/Firebase/collection'
import { FirebaseStorage } from '@/service/Firebase/storage'
import { LogsResponse, TagsResponse } from '@/type'

import EditLogForm from '@/components/EditLogForm'
import { Suspense } from 'react'

type Props = {
  params: {
    id: string
  }
}
export default async function EditPost({ params }: Props) {
  const db = new FirebaseCollection()
  const storage = new FirebaseStorage()

  const logs = await db.getDocs<LogsResponse>('logs')
  const log = logs.find((log) => log.id === params.id)

  const tags = await db.getDocs<TagsResponse>('tags')

  const content = await storage.getContentData(log?.storagePath)

  return (
    <div className='max-w-7xl m-auto'>
      <h1 className='mb-20'>Edit Post</h1>
      {typeof log === 'undefined' ? (
        <div>Not Found The {params.id} Log</div>
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          <EditLogForm
            tags={tags}
            log={log}
            content={content as string}
          />
        </Suspense>
      )}
    </div>
  )
}
