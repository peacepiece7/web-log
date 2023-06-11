import { FirebaseStorage } from '@/service/Firebase/storage'
import { Log } from '@/type'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = (await request.json()) as { log: Log; content?: string }
    const store = new FirebaseStorage()

    const content = data.content
    if (content !== undefined) {
      store.uploadContentData({ ...data, content })
    }

    return NextResponse.json({ state: 'success' })
  } catch (err) {
    return NextResponse.json({ state: 'failure' })
  }
}

export async function GET() {
  return NextResponse.json({ hi: 'hi' })
}
