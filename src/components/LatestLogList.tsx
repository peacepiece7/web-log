import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Logs } from '@/type'

type Props = {
  logs: Logs
}

const randomBrightColor = (str: string) => {
  var hash = 0
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  var colour = '#'
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xff
    colour += ('00' + value.toString(16)).substr(-2)
  }
  return colour
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
                    console.log(rgb)
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
