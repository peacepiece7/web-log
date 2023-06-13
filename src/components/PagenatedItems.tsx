'use client'

import { LogsResponse, ThumbnailsResponse } from '@/type'
import React from 'react'
import { useRouter } from 'next/navigation'
import Items from './Items'
import ReactPaginate from 'react-paginate'
import './PagenatedItems.css'

type Props = {
  itemsPerPage: number
  page: number
  items: LogsResponse
  thumbs: ThumbnailsResponse
}
export default function PagenatedItems({ itemsPerPage, items, thumbs, page }: Props) {
  const router = useRouter()
  const itemOffset = page * itemsPerPage

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage
  const currentItems = items.slice(itemOffset, endOffset)
  const pageCount = Math.ceil(items.length / itemsPerPage)

  // Invoke when user click to request another page.
  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % items.length
    router.push(`/logs/${newOffset / itemsPerPage + 1}`)
  }
  return (
    <>
      <Items
        logs={currentItems}
        thumbs={thumbs}
      />
      <div id='pagenation'>
        <ReactPaginate
          className='flex cursor-pointer justify-center pt-10'
          breakLabel='...'
          nextLabel='next >'
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel='< prev'
          renderOnZeroPageCount={null}
          forcePage={page}
        />
      </div>
    </>
  )
}
