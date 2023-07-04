import { Suspense } from 'react'
import { LogsResponse, ThumbnailsResponse } from '@/type'
import PagenatedItems from '@/components/PagenatedItems'
import { getFetcher } from '@/service/fetcher'

type Props = {
  params: {
    page: string
  }
}
export default async function LogPage(props: Props) {
  const response = await getFetcher('logs', 'thumbnails')

  const logs = response[0].logs as LogsResponse
  const thumbnails = response[1].thumbnails as ThumbnailsResponse

  return (
    <div className='max-w-7xl inset-0 m-auto pl-5 pr-5'>
      <h1>Logs</h1>
      <Suspense fallback={<div>Loading... from src/app/logs/[pages]</div>}>
        <PagenatedItems
          itemsPerPage={5}
          items={logs}
          thumbs={thumbnails}
          page={parseInt(props.params.page) - 1}
        />
      </Suspense>
    </div>
  )
}
export const metadata = {
  title: 'Web Log | logs',
}

export async function generateStaticParams() {
  const logsResponse = await fetch(
    `${
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : `https://${process.env.VERCEL_URL}`
    }/api/get/logs`,
  )
  const logsData = await logsResponse.json()
  const logs = logsData.logs as LogsResponse

  const itemsPerPage = 5
  const pages = []
  for (let i = 0; i < Math.ceil(logs.length / itemsPerPage); i++) {
    pages.push(i + 1)
  }
  return pages.map((page) => ({ page: String(page) }))
}
