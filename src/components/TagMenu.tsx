'use client'
import { TagsResponse } from '@/type'
import { useEffect, useState } from 'react'
import Link from 'next/link'

type Props = {
  tags: TagsResponse
}
export default function TagMenu({ tags }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    window.addEventListener('click', (e) => {
      const target = e.target as HTMLElement
      if (target.id === 'tagBtn') return
      setIsOpen(false)
    })
  }, [])

  const openMenu = () => setIsOpen(!isOpen)

  return (
    <div>
      <p
        id='tagBtn'
        onClick={openMenu}
        className='cursor-pointer m-0 hover:text-red-500 transition-all'
      >
        tags
      </p>
      <div
        id='tagMenu'
        className={`absolute top-[70px] right-0 bg-white z-20 border-black border-solid transition-all overflow-hidden
        ${isOpen ? 'w-[400px] border-[1px]' : 'border-0 w-0'}`}
      >
        <ul className='p-0'>
          {tags &&
            tags
              .sort((a, b) => {
                return a.name > b.name ? 1 : -1
              })
              .map((tag) => {
                return (
                  <Link
                    prefetch={process.env.NODE_ENV === 'production'}
                    className='block w-full'
                    href={`/tags/${tag.name}`}
                    key={tag.id}
                  >
                    <li className='mt-4 pl-12 p-4 text-left rounded-md hover:text-red-500 transition-all'>
                      {tag.name}
                    </li>
                  </Link>
                )
              })}
        </ul>
      </div>
    </div>
  )
}
