import { LogsResponse, TagsResponse, ThumbnailsResponse } from '@/type'

import FilteredList from '@/components/FilteredList'
import { getDocsCache } from '@/service/Firebase_fn/collection'

type Props = {
  params: {
    tagName: string
  }
}
export default async function Tags({ params }: Props) {
  const logs = await getDocsCache<LogsResponse>('logs')
  const thumbnails = await getDocsCache<ThumbnailsResponse>('thumbnails')

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
