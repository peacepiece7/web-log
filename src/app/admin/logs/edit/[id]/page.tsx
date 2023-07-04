import { LogsResponse, TagsResponse } from '@/type'
import { Suspense } from 'react'

import EditLogForm from '@/components/LogEditForm'
import { getDocsCache } from '@/service/Firebase_fn/collection'
import { getContentDataCache } from '@/service/Firebase_fn/storage'

type Props = {
  params: {
    id: string
  }
}
export default async function EditPost({ params }: Props) {
  // * firebase연결 및 데이터(logs, tags, content) 가져오기
  const { logs } = await getDocsCache<LogsResponse>('logs')
  const { tags } = await getDocsCache<TagsResponse>('tags')
  const log = logs.find((log) => log.id === params.id)
  const content = await getContentDataCache(log?.storagePath)

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
