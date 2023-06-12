import FirebaseCollection from '@/service/Firebase/collection'
import { TagResponse, ThumbnailDocument, ThumbnailResponse } from '@/type'
import { NextResponse } from 'next/server'

export type AddTagsRequest = {
  id: string
  name: string
  thumbnail: string
}

export async function POST(request: Request) {
  try {
    const tag = (await request.json()) as AddTagsRequest
    const db = new FirebaseCollection()

    const res = await db.addDoc<ThumbnailDocument>('thumbnails', {
      name: `${tag.name}_logo`,
      source: tag.thumbnail,
    })
    const thumbId = res.id

    const response = await db.addDoc<Omit<TagResponse, 'id'>>('tags', {
      name: tag.name,
      thumbnailId: thumbId,
    })
    return NextResponse.json({ state: 'success', response })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ state: 'failure', error })
  }
}

export async function GET() {
  return NextResponse.json({ hi: 'hi!' })
}
