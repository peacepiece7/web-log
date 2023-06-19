import { LogsResponse, ThumbnailsResponse } from '@/type'
import FirebaseCollection from '@/service/Firebase/collection'

import PagenatedItems from '@/components/PagenatedItems'
import { Suspense } from 'react'

type Props = {
  params: {
    page: string
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
        <Suspense fallback={<div>LOADING ...</div>}>
          <PagenatedItems
            itemsPerPage={5}
            items={logs}
            thumbs={thumbnails}
            page={parseInt(props.params.page) - 1}
          />
        </Suspense>
      </div>
    </main>
  )
}

export async function generateStaticParams() {
  const db = new FirebaseCollection()
  const logs = await db.getDocs<LogsResponse>('logs')
  const itemsPerPage = 5
  const pages = []
  for (let i = 0; i < Math.ceil(logs.length / itemsPerPage); i++) {
    pages.push(i + 1)
  }
  return pages.map((page) => ({ page: String(page) }))
}
