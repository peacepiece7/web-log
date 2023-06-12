import React from 'react'
import Link from 'next/link'

export default function AdminHeader() {
  return (
    <header className='flex justify-end h-[100px]'>
      <Link
        className='pr-12'
        href='/admin/logs'
      >
        Logs
      </Link>
      <Link
        className='pr-12'
        href='/admin/logs/add'
      >
        Add Log
      </Link>
      <Link
        className='pr-12'
        href='/admin/tags'
      >
        Tags
      </Link>
    </header>
  )
}
