import React from 'react'
import Image from 'next/image'
import { LogData } from '../../type'
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
              <Image
                src={`/${log.thumbnail}`}
                alt={log.title + ' thumnail'}
                width={400}
                height={400}
              />
              <h2 className='text-2xl'>{log.title}</h2>
            </div>
          </div>
        )
      })}
    </div>
  )
}
