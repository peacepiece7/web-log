import { LogsResponse, ThumbnailsResponse } from '@/type'

import FirebaseCollection from '@/service/Firebase/collection'
import LatestLogList from '@/components/LatestLogList'

export default async function Posts() {
  const db = new FirebaseCollection()
  const logs = await db.getDocs<LogsResponse>('logs')
  const thumbs = await db.getDocs<ThumbnailsResponse>('thumbnails')

  return (
    <div className='pl-8 pr-8 max-w-7xl m-auto'>
      <h1>Admin Logs</h1>
      <LatestLogList
        logs={logs}
        thumbnails={thumbs}
        basePath='/admin/logs/edit'
      />
    </div>
  )
}
