import React from 'react'
import Link from 'next/link'
import TagMenu from './TagMenu'
import FirebaseCollection from '@/service/Firebase/collection'
import { TagsResponse } from '@/type'

export default async function Header() {
  const db = new FirebaseCollection()
  const tags = await db.getDocs<TagsResponse>('tags')
  return (
    <header
      id='header'
      className='border-b-2'
    >
      <div className='flex justify-between pr-4 pl-4'>
        <div className='hover:text-red-500 transition-all'>
          <Link href='/'>
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
              <TagMenu tags={tags} />
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
