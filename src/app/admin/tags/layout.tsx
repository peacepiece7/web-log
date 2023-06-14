'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminHeader from '@/components/AdminHeader'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // * 관리자 인증 (localstorage에 저장된 id, password)
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
        if (!data.isAdmin) router.push('/admin')
        setIsAdmin(data.isAdmin)
      })
  }, [router])

  return (
    <div>
      {isAdmin ? (
        <>
          <AdminHeader />
          <div>{children}</div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}
