import FirebaseCollection from '@/service/Firebase/collection'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { log: data } = await request.json()
    const db = new FirebaseCollection()
    db.setDoc('logs', data.id, data)
    return NextResponse.json({ state: 'success' })
  } catch (err) {
    return NextResponse.json({ state: 'failure' })
  }
}

export async function GET() {
  return NextResponse.json({ hi: 'hi' })
}
