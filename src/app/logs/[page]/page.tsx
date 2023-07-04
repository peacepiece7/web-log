import Link from 'next/link'
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
    <PagenatedItems
      itemsPerPage={5}
      items={logs}
      thumbs={thumbnails}
      page={parseInt(props.params.page) - 1}
    />
  )
}

export async function generateStaticParams() {
  const response = await getFetcher('logs')
  const logs = response[0].logs as LogsResponse

  const itemsPerPage = 5
  const pages = []
  for (let i = 0; i < Math.ceil(logs.length / itemsPerPage); i++) {
    pages.push(i + 1)
  }
  return pages.map((page) => ({ page: String(page) }))
}
