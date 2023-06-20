import { LogsResponse, ThumbnailsResponse } from '@/type'

import PagenatedItems from '@/components/PagenatedItems'
import { getAPI } from '@/api'

type Props = {
  params: {
    page: string
  }
}
export default async function LogPage(props: Props) {
  // const db = new FirebaseCollection()
  // const logs = await db.getDocs<LogsResponse>('logs')
  // const thumbnails = await db.getDocs<ThumbnailsResponse>('thumbnails')
  const res = await Promise.all([getAPI('api/get/logs'), getAPI('api/get/thumbnails')])

  const { logs }: { logs: LogsResponse } = res[0]
  const { thumbnails }: { thumbnails: ThumbnailsResponse } = res[1]

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
  // const db = new FirebaseCollection()
  // const logs = await db.getDocs<LogsResponse>('logs')
  const { logs }: { logs: LogsResponse } = await getAPI('api/get/logs')
  const itemsPerPage = 5
  const pages = []
  for (let i = 0; i < Math.ceil(logs.length / itemsPerPage); i++) {
    pages.push(i + 1)
  }
  return pages.map((page) => ({ page: String(page) }))
}
