import { LogsResponse, TagsResponse } from '@/type'
import { Suspense } from 'react'

import FirebaseCollection from '@/service/Firebase/collection'
import { FirebaseStorage } from '@/service/Firebase/storage'
import EditLogForm from '@/components/LogEditForm'

type Props = {
  params: {
    id: string
  }
}
export default async function EditPost({ params }: Props) {
  // * firebase연결 및 데이터(logs, tags, content) 가져오기
  const db = new FirebaseCollection()
  const storage = new FirebaseStorage()
  const logs = await db.getDocs<LogsResponse>('logs')
  const tags = await db.getDocs<TagsResponse>('tags')
  const log = logs.find((log) => log.id === params.id)
  const content = await storage.getContentData(log?.storagePath)

  return (
    <div>
      <h1 className='mb-20'>Admin Edit Post</h1>
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
