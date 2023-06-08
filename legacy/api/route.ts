// import { NextResponse } from 'next/server'

// type Context = {
//   params: {
//     id: string
//     password: string
//   }
// }
// export async function POST(request: Request) {
//   console.log('POST 요청이 들어왔습니다.')
//   const res: Context['params'] = await request.json()
//   console.log(res)
//   if (res.id === process.env.ADMIN_ID && res.password === process.env.ADMIN_PASSWORD) {
//     return NextResponse.json({ isAdmin: true })
//   }
//   return NextResponse.json({ isAdmin: false })
// }

// export async function GET(request: Request) {
//   console.log('GET 요청이 들어왔습니다.')
//   return NextResponse.json({ hi: 'hi' })
// }
