import { NextResponse } from 'next/server'
import { FirebaseStorage } from '@/service/Firebase/storage'

// * Update Content API
export async function POST(request: Request) {
  try {
    const { storagePath, content } = (await request.json()) as UpdateContentRequest
    const store = new FirebaseStorage()

    const response = await store.uploadContentData(storagePath, content)

    return NextResponse.json({ state: 'success', response })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ state: 'failure', error })
  }
}

export type UpdateContentRequest = {
  storagePath: string
  content: string
}
