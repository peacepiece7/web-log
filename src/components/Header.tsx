import { LogsResponse, TagsResponse } from '@/type'
import Link from 'next/link'

import TagMenu from '@/components/TagMenu'
import { getFetcher } from '@/service/fetcher'

export default async function Header() {
  const response = await getFetcher('logs', 'tags')

  const logs = response[0].logs as LogsResponse
  const tags = response[1].tags as TagsResponse

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
