import { ThumbnailResponse } from '@/type'
import { NextResponse } from 'next/server'
import { setDocCache } from '@/service/Firebase_fn/collection'

// * Update Thumbnail API
export async function POST(request: Request) {
  try {
    const thumb = (await request.json()) as ThumbnailResponse

    const { id, ...thumbData } = thumb
    const response = await setDocCache<Omit<ThumbnailResponse, 'id'>>('thumbnails', id, thumbData)
    return NextResponse.json({ state: 'success', response })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ state: 'failure', error })
  }
}
