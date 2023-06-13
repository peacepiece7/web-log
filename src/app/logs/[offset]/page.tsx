import PagenatedItems from '@/components/PagenatedItems'
import FirebaseCollection from '@/service/Firebase/collection'
import { LogsResponse, ThumbnailsResponse } from '@/type'
import React from 'react'

type Props = {
  params: {
    offset: string
  }
}
export default async function LogPage(props: Props) {
  const db = new FirebaseCollection()
  const logs = await db.getDocs<LogsResponse>('logs')
  const thumbnails = await db.getDocs<ThumbnailsResponse>('thumbnails')

  return (
    <main>
      <div className='max-w-7xl inset-0 m-auto pl-5 pr-5'>
        <h1>Logs</h1>
        <PagenatedItems
          itemsPerPage={2}
          items={logs}
          thumbs={thumbnails}
          page={parseInt(props.params.offset) - 1}
        />
      </div>
    </main>
  )
}
