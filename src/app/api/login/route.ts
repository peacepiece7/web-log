import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const id = body.id
    const password = body.password
    if (id === process.env.ADMIN_ID && password === process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ isAdmin: true })
    }
    return NextResponse.json({ isAdmin: false })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ isAdmin: false })
  }
}

export async function GET() {
  return NextResponse.json({ hi: 'hi!' })
}
