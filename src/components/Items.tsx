import { LogsResponse, ThumbnailsResponse } from '@/type'
import React from 'react'
import Link from 'next/link'
import { randomBrightColor } from '@/utils'

type Props = {
  logs: LogsResponse
  thumbs: ThumbnailsResponse
}
export default function Items({ logs, thumbs: thumbnails }: Props) {
  return (
    <div>
      {logs.map((log) => {
        const thumb = thumbnails.find((thumb) => log.thumbnailId === thumb.id)
        return (
          <div
            key={log.id}
            className='flex hover:drop-shadow-xl p-4 transition ease-in-out bg-white rounded-xl mt-12'
          >
            <div className='pb-4 flex-1'>
              <Link href={`/log/${log.id}`}>
                <div
                  className='w-[200px] h-[200px] flex justify-center items-center rounded-md overflow-hidden'
                  dangerouslySetInnerHTML={{ __html: thumb?.source ? thumb.source : '' }}
                />
                <h2 className='text-3xl pt-4'>{log.title}</h2>
                <p className='text-end pt-4'>
                  Tags :
                  {log.tags.map((name) => {
                    const rgb = randomBrightColor(name)
                    return (
                      <span
                        style={{ backgroundColor: rgb }}
                        className='p-1 ml-1 rounded-md text-white'
                        key={name}
                      >
                        {name}
                      </span>
                    )
                  })}
                </p>
                <p className='text-end pt-4'>{`Last Modified At : ${log.lastModifiedAt}`}</p>
              </Link>
            </div>
          </div>
        )
      })}
    </div>
  )
}
