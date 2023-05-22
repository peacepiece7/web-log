import React from 'react'
import Link from 'next/link'
export default function Header() {
  return (
    <header className='flex justify-between'>
      <div>
        <div>peace</div>
        <div>piece</div>
      </div>
      <nav>
        <ul className='flex justify-between w-48 bg-slate-500'>
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
    </header>
  )
}
