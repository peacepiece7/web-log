import { ThumbnailResponse } from '@/type'
import { NextResponse } from 'next/server'
import FirebaseCollection from '@/service/Firebase/collection'

// * Update Thumbnail API
export async function POST(request: Request) {
  try {
    const thumb = (await request.json()) as ThumbnailResponse
    const db = new FirebaseCollection()

    const { id, ...thumbData } = thumb
    const response = await db.setDoc<Omit<ThumbnailResponse, 'id'>>('thumbnails', id, thumbData)
    return NextResponse.json({ state: 'success', response })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ state: 'failure', error })
  }
}
