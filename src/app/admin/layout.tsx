'use client'
import { Router, useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { redirect } from 'next/navigation'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}
