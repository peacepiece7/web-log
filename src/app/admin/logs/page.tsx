import { LogsResponse, ThumbnailsResponse } from '@/type'

import LatestLogList from '@/components/LatestLogList'
import { getDocsCache } from '@/service/Firebase_fn/collection'

export default async function Posts() {
  const { logs } = await getDocsCache<LogsResponse>('logs')
  const { thumbnails } = await getDocsCache<ThumbnailsResponse>('thumbnails')

  return (
    <div className='pl-8 pr-8 max-w-7xl m-auto'>
      <h1>Admin Logs</h1>
      <LatestLogList
        logs={logs}
        thumbnails={thumbnails}
        basePath='/admin/logs/edit'
      />
    </div>
  )
}
