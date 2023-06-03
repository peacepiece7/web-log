import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

type Log = {
  id: string
  title: string
  categories: string[]
  thumbnail: string
  fileName: string
  createdAt: string
}

type Props = {
  logs: Log[]
}
export default function LatestLogList({ logs }: Props) {
  return (
    <div>
      {logs.map((log) => {
        return (
          <div
            key={log.id}
            className='flex justify-center'
          >
            <div className='pb-12'>
              <Link href={`/log/${log.id}`}>
                <Image
                  src={`/${log.thumbnail}`}
                  alt={log.title + ' thumnail'}
                  width={400}
                  height={400}
                />
                <h2 className='text-2xl'>{log.title}</h2>
              </Link>
            </div>
          </div>
        )
      })}
    </div>
  )
}
