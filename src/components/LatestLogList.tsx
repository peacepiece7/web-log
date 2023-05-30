import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { LogData } from '../type'
type Props = {
  logData: LogData
}
export default function LatestLogList({ logData }: Props) {
  return (
    <div>
      {logData.webLog.map((log) => {
        return (
          <div
            key={log.id}
            className='flex justify-center'
          >
            <div className='pb-12'>
              <Link href={`/log/${log.contentID}`}>
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
