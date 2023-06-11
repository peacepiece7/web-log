import React from 'react'
import Link from 'next/link'
import { Logs } from '@/type'
import { randomBrightColor } from '@/utils'

type Props = {
  logs: Logs
}

export default function LatestLogList({ logs }: Props) {
  return (
    <div className='pl-5 pr-5'>
      {logs.map((log) => {
        return (
          <div
            key={log.id}
            className='flex'
          >
            <div className='pb-14 flex-1'>
              <Link href={`/log/${log.id}`}>
                {log.thumbnailSource && (
                  <div
                    className='w-[200px] h-[200px] flex justify-center items-center rounded-md overflow-hidden'
                    dangerouslySetInnerHTML={{ __html: log.thumbnailSource }}
                  />
                )}
                <h2 className='text-2xl'>{log.title}</h2>
                <p className='text-end pt-12'>
                  Tags :
                  {log.tags.map((name) => {
                    const rgb = randomBrightColor(name)
                    return (
                      <span
                        style={{ backgroundColor: rgb }}
                        className='p-1 ml-1 rounded-md'
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
