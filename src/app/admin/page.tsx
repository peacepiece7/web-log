'use client'
import React, { useEffect, useState } from 'react'

export default function Login() {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  function login() {
    console.log(name, password)
  }

  return (
    <div className=''>
      <div className='max-w-7xl inset-0 m-auto pr-4 pl-4 mt-48'>
        <h1 className='text-5xl'>Log-in for admin</h1>
        <form
          className='flex flex-col max-w-2xl ml-12'
          onSubmit={login}
        >
          <input
            className='h-12 mt-24'
            type='text'
            placeholder='Enter a admin user name'
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className='mt-4 h-12'
            type='password'
            placeholder='Enter a password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded max-w-[125px] h-[45px] mt-4 ml-auto'
            type='submit'
            value='submit'
          />
        </form>
      </div>
    </div>
  )
}
