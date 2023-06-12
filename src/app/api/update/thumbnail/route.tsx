import FirebaseCollection from '@/service/Firebase/collection'
import { ThumbnailResponse } from '@/type'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const thumb = (await request.json()) as ThumbnailResponse
    const db = new FirebaseCollection()
    const thumbId = thumb.id
    const { id, ...thumbData } = thumb

    const response = await db.setDoc<Omit<ThumbnailResponse, 'id'>>(
      'thumbnails',
      thumbId,
      thumbData,
    )

    return NextResponse.json({ state: 'success', response })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ state: 'failure', error })
  }
}

export async function GET() {
  return NextResponse.json({ state: 'success' })
}
