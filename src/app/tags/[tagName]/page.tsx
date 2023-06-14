import { LogsResponse, TagsResponse, ThumbnailsResponse } from '@/type'

import FilteredList from '@/components/FilteredList'
import FirebaseCollection from '@/service/Firebase/collection'

type Props = {
  params: {
    tagName: string
  }
}
export default async function Tags({ params }: Props) {
  const db = new FirebaseCollection()
  const logs = await db.getDocs<LogsResponse>('logs')
  const thumbs = await db.getDocs<ThumbnailsResponse>('thumbnails')

  const filteredLogs = logs.filter((log) => log.tags.includes(params.tagName))
  const filteredThumbs = thumbs.filter((thumb) => {
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
  const db = new FirebaseCollection()
  const tags = await db.getDocs<TagsResponse>('tags')
  return tags.map((tag) => ({ tagName: tag.name }))
}
