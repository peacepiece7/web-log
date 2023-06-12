'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const id = localStorage.getItem('weblogId')
    const password = localStorage.getItem('weblogPassword')
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.isAdmin) router.push('/')
        setIsAdmin(data.isAdmin)
      })
  }, [])

  return <div>{isAdmin ? <>{children}</> : <div>Loading...</div>}</div>
}
