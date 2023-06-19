'use client'
import { LogsResponse, ThumbnailsResponse } from '@/type'
import { useRouter } from 'next/navigation'
import ReactPaginate from 'react-paginate'

import Items from './Items'
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

  const latestItems = items.sort((a, b) => {
    const anum = parseInt(a.lastModifiedAt.split('-').join(''))
    const bnum = parseInt(b.lastModifiedAt.split('-').join(''))
    return bnum - anum
  })

  const endOffset = itemOffset + itemsPerPage
  const currentItems = latestItems.slice(itemOffset, endOffset)
  const pageCount = Math.ceil(latestItems.length / itemsPerPage)

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % latestItems.length
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
