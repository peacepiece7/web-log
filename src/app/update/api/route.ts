import { FirebaseStorage } from '@/service/Firebase/storage'
import { Log } from '@/type'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    console.log('POST 요청이 들어왔습니다.')
    const data = (await request.json()) as { log: Log; content: string }
    const store = new FirebaseStorage()
    store.uploadData(data)
    return NextResponse.json({ hi: 'success' })
  } catch (err) {
    return NextResponse.json({ hi: 'failure' })
  }
}

export async function GET(request: Request) {
  console.log('GET 요청이 들어왔습니다.')
  return NextResponse.json({ hi: 'hi' })
}
