import React from 'react'
import Link from 'next/link'
export default function Header() {
  return (
    <header className='border-b-2'>
      <div className='flex justify-between pl-4 pr-4'>
        <div>
          <Link href='/'>
            <p>peace</p>
            <p>piece</p>
          </Link>
        </div>
        <nav className='flex items-center'>
          <ul className='flex justify-between w-48'>
            <li>
              <Link href='/'>Home</Link>
            </li>
            <li>
              <Link href='log'>Log</Link>
            </li>
            <li>
              <Link href='about'>About</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
