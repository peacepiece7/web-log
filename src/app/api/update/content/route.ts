import { FirebaseStorage } from '@/service/Firebase/storage'
import { NextResponse } from 'next/server'

export type UpdateContentRequest = {
  storagePath: string
  content: string
}

export async function POST(request: Request) {
  try {
    const { storagePath, content } = (await request.json()) as UpdateContentRequest
    const store = new FirebaseStorage()
    const response = await store.uploadContentData(storagePath, content)
    console.log('10초 ㄱㄷ')
    await new Promise((res) => setTimeout(res, 10000))
    console.log('10초 끝')
    return NextResponse.json({ state: 'success', response })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ state: 'failure', error })
  }
}

export async function GET() {
  return NextResponse.json({ hi: 'hi' })
}
