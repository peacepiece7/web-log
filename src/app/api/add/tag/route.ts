import { TagResponse, ThumbnailDocument } from '@/type'
import { NextResponse } from 'next/server'
import FirebaseCollection from '@/service/Firebase/collection'

// * Add Tag API
export async function POST(request: Request) {
  try {
    const tag = (await request.json()) as AddTagsRequest
    const db = new FirebaseCollection()

    // * 썸네일 저장
    const res = await db.addDoc<ThumbnailDocument>('thumbnails', {
      name: `${tag.name}_logo`,
      source: tag.thumbnail,
    })
    const thumbId = res.id

    // * 태그 저장
    await db.addDoc<Omit<TagResponse, 'id'>>('tags', {
      name: tag.name,
      thumbnailId: thumbId,
    })

    return NextResponse.json({ state: 'success', response: '' })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ state: 'failure', error })
  }
}

export type AddTagsRequest = {
  id: string
  name: string
  thumbnail: string
}
