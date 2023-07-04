import { LogsResponse, TagsResponse } from '@/type'
import Link from 'next/link'

import TagMenu from '@/components/TagMenu'

export default async function Header() {
  const logsResponse = await fetch(
    `${
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : `https://${process.env.VERCEL_URL}`
    }/api/get/logs`,
  )
  const logsData = await logsResponse.json()
  const logs = logsData.logs as LogsResponse

  const tagsResponse = await fetch(
    `${
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : `https://${process.env.VERCEL_URL}`
    }/api/get/tags`,
  )
  const tagsData = await tagsResponse.json()
  const tags = tagsData.tags as TagsResponse

  return (
    <header
      id='header'
      className='border-b-2'
    >
      <div className='flex justify-between pr-4 pl-4'>
        <div className='hover:text-red-500 transition-all'>
          <Link
            prefetch={process.env.NODE_ENV === 'production'}
            href='/'
          >
            <p>PEACE</p>
            <p>PIECE</p>
          </Link>
        </div>
        <nav className='flex items-center'>
          <ul className='flex justify-between'>
            <li className='pr-4'>
              <Link
                href='/'
                className='hover:text-red-500 transition-all'
              >
                Home
              </Link>
            </li>
            <li className='pr-4'>
              <TagMenu
                tags={tags}
                logs={logs}
              />
            </li>
            <li className='pr-4'>
              <Link
                href='/logs/1'
                className='hover:text-red-500 transition-all'
              >
                Logs
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
