import React from 'react'

export default function Header() {
  return (
    <header className='flex justify-between'>
      <div>
        <div>peace</div>
        <div>piece</div>
      </div>
      <nav>
        <ul className='flex justify-between w-48 bg-slate-500'>
          <li>Home</li>
          <li>Log</li>
          <li>About</li>
        </ul>
      </nav>
    </header>
  )
}
