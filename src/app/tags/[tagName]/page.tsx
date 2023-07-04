import { LogsResponse, TagsResponse, ThumbnailsResponse } from '@/type'

import FilteredList from '@/components/FilteredList'
import { getDocsCache } from '@/service/Firebase_fn/collection'

type Props = {
  params: {
    tagName: string
  }
}

export default async function Tags({ params }: Props) {
  const logsResponse = await fetch(
    `${
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : `https://${process.env.VERCEL_URL}`
    }/api/get/logs`,
  )
  const logsData = await logsResponse.json()
  const logs = logsData.logs as LogsResponse

  const thumbsResponse = await fetch(
    `${
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : `https://${process.env.VERCEL_URL}`
    }/api/get/thumbnails`,
  )
  const thumbsData = await thumbsResponse.json()
  const thumbnails = thumbsData.thumbnails as ThumbnailsResponse

  const filteredLogs = logs.filter((log) => log.tags.includes(params.tagName))
  const filteredThumbs = thumbnails.filter((thumb) => {
    return filteredLogs.some((log) => log.thumbnailId === thumb.id)
  })

  return (
    <main>
      <div className='max-w-7xl inset-0 m-auto pl-5 pr-5'>
        <h1>{`${params.tagName} Logs`}</h1>
        <FilteredList
          logs={filteredLogs}
          thumbs={filteredThumbs}
          basePath='/log'
        />
      </div>
    </main>
  )
}

export async function generateStaticParams() {
  const tags = await getDocsCache<TagsResponse>('tags')
  return tags.map((tag) => ({ tagName: tag.name }))
}
