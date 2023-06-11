import { FirebaseStorage } from '@/service/Firebase/storage'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = (await request.json()) as { name: string; thumbnail: string }

    console.log('API에서 받은 데이터 :  ', data)
    const store = new FirebaseStorage()
    store.updateTagData(data)
    return NextResponse.json({ state: 'success' })
  } catch (err) {
    return NextResponse.json({ state: 'failure' })
  }
}

export async function GET(request: Request) {
  return NextResponse.json({ hi: 'hi' })
}
