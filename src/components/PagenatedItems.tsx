'use client'
import { useEffect, useState } from 'react'
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
  const [pageCnt, setPageCnt] = useState(0)
  const [curItems, setCurItems] = useState<LogsResponse>([])
  const router = useRouter()

  useEffect(() => {
    const itemOffset = page * itemsPerPage

    const endOffset = itemOffset + itemsPerPage
    const sortedItems = items.sort((a, b) => {
      const anum = parseInt(a.createdAt.split('-').join(''))
      const bnum = parseInt(b.createdAt.split('-').join(''))
      return bnum - anum
    })
    const currentItems = sortedItems.slice(itemOffset, endOffset)
    setCurItems(currentItems)

    const pageCount = Math.ceil(items.length / itemsPerPage)
    setPageCnt(pageCount)
  }, [])

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % items.length
    // window.location.replace(`/logs/${newOffset / itemsPerPage + 1}`)
    router.push(`/logs/${newOffset / itemsPerPage + 1}`)
  }

  return (
    <>
      <Items
        logs={curItems}
        thumbs={thumbs}
      />
      <div id='pagenation'>
        <ReactPaginate
          className='flex cursor-pointer justify-center pt-10'
          breakLabel='..'
          nextLabel='>'
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCnt}
          previousLabel='<'
          forcePage={page}
          renderOnZeroPageCount={null}
          marginPagesDisplayed={1}
        />
      </div>
    </>
  )
}
