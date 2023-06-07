import React from 'react'
import Link from 'next/link'
export default function Header() {
  return (
    <header className='border-b-2'>
      <div className='flex justify-between pr-4 pl-4'>
        <div>
          <Link href='/'>
            <p>PEACE</p>
            <p>PIECE</p>
          </Link>
        </div>
        <nav className='flex items-center'>
          <ul className='flex justify-between'>
            <li className='pr-4'>
              <Link href='/'>Home</Link>
            </li>
            <li className='pr-4'>
              <Link href='log'>Log</Link>
            </li>
            <li className='pr-4'>
              <Link href='about'>About</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
