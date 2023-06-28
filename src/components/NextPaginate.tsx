'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Props = {
  className: string
  breakLabel: string
  nextLabel: string
  previousLabel: string
  pageRangeDisplayed: number
  pageCount: number
}
// Props arguments
export default function NextPaginate({
  className,
  pageCount,
  breakLabel,
  nextLabel,
  previousLabel,
  pageRangeDisplayed,
}: Props) {
  // pageCount : 총 페이지 개수
  const pathName = usePathname()

  const pages = new Array(pageCount).fill(0).map((_, i) => {
    const p = i + 1
    return p
  })

  return (
    <div className={className}>
      <Link
        href='logs/1'
        prefetch={false}
      >
        {previousLabel}
      </Link>
      {pages.map((page) => {
        return (
          <Link
            href={`logs/${page}`}
            key={page}
            prefetch={false}
          >
            {page}
          </Link>
        )
      })}
      <Link
        href='logs/2'
        prefetch={false}
      >
        {nextLabel}
      </Link>
    </div>
  )
}
