// 'use client'
// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// export default async function middleware(request: NextRequest) {
//   console.log('미들웨어 실행 중...')
//   if (process.env.NODE_ENV === 'development') {
//     process.env.SERVER_URL = 'http://localhost:3000'
//   }

//   if (typeof window !== 'undefined') {
//     console.log(localStorage?.getItem('weblogId'), localStorage?.getItem('weblogPassword'))
//     const response = await fetch(`${process.env.SERVER_URL}/admin/api`, {
//       method: 'POST',
//       body: JSON.stringify({
//         id: localStorage.getItem('weblogId'),
//         password: localStorage.getItem('weblogPassword'),
//       }),
//     })
//     const { isAdmin } = await response.json()
//     console.log(isAdmin, localStorage.getItem('weblogId'), localStorage.getItem('weblogPassword'))
//     if (isAdmin) {
//       console.log('관리자입니다.')
//       return NextResponse.next()
//     } else {
//       console.log('관리자가 아닙니다.')
//       return NextResponse.redirect('/')
//     }
//   }

//   return NextResponse.next()
// }

// export const config = {
//   matcher: ['/admin/:path'],
// }
