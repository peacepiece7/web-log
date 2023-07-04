import { LogsResponse, TagsResponse, ThumbnailsResponse } from '@/type'

import FilteredList from '@/components/FilteredList'
import { getDocsCache } from '@/service/Firebase_fn/collection'
import { getFetcher } from '@/service/fetcher'

type Props = {
  params: {
    tagName: string
  }
}

export default async function Tags({ params }: Props) {
  const response = await getFetcher('logs', 'thumbnails')
  const logs = response[0].logs as LogsResponse
  const thumbnails = response[1].thumbnails as ThumbnailsResponse

  const filteredLogs = logs.filter((log) => log.tags.includes(params.tagName))
  const filteredThumbs = thumbnails.filter((thumb) => {
    return filteredLogs.some((log) => log.thumbnailId === thumb.id)
  })

  return (
    <main>
      <div className='max-w-7xl inset-0 m-auto pl-5 pr-5 mb-12'>
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
  const response = await getFetcher('logs', 'thumbnails')
  const tags = response[0].logs as TagsResponse
  return tags.map((tag) => ({ tagName: tag.name }))
}
