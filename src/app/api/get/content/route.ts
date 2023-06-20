import { LogDocument, ThumbnailDocument } from '@/type'
import { NextResponse } from 'next/server'
import { v1 } from 'uuid'

import { FirebaseStorage } from '@/service/Firebase/storage'

export type GETContentRequest = {
  ref: string
}

export async function POST(request: Request) {
  try {
    const params = (await request.json()) as GETContentRequest
    const store = new FirebaseStorage()
    const content = await store.getContentData(params.ref)
    return NextResponse.json({ content })
  } catch (error) {
    console.error(error)
    return NextResponse.json('error')
  }
}
