import { LogsResponse, ThumbnailsResponse } from '@/type'
import FirebaseCollection from '@/service/Firebase/collection'

import PagenatedItems from '@/components/PagenatedItems'
import { Suspense } from 'react'
import { getAPI } from '@/api'

type Props = {
  params: {
    page: string
  }
}
export default async function LogPage(props: Props) {
  const url =
    process.env.NODE_ENV === 'development'
      ? `http://localhost:3000`
      : `https://web-log-wheat.vercel.app`

  const res = await Promise.all([
    getAPI(`${url}/api/get/logs`),
    getAPI(`${url}/api/get/thumbnails`),
  ])

  const { logs }: { logs: LogsResponse } = res[0]
  const { thumbnails }: { thumbnails: ThumbnailsResponse } = res[1]

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
