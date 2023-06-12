'use client'
import { TagsResponse, ThumbnailsResponse } from '@/type'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
  tags: TagsResponse
  thumbs: ThumbnailsResponse
}
export default function TagsList({ tags, thumbs }: Props) {
  return (
    <ul>
      {tags.map((tag) => {
        const thumb = thumbs.find((thumb) => thumb.id === tag.thumbnailId)
        return (
          <li
            key={tag.id}
            className='pt-24'
          >
            <Link href={`admin/tags/${tag.id}`}>
              <div
                className='w-[100px] h-[100px] flex justify-center items-center rounded-md overflow-hidden'
                dangerouslySetInnerHTML={{ __html: thumb?.source ? thumb.source : '' }}
              />
              <span>{tag.name}</span>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
