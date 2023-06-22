import { TagResponse, ThumbnailDocument } from '@/type'
import { NextResponse } from 'next/server'
import { addDocCache } from '@/service/Firebase_fn/collection'

// * Add Tag API
export async function POST(request: Request) {
  try {
    const tag = (await request.json()) as AddTagsRequest

    // * 썸네일 저장
    const res = await addDocCache<ThumbnailDocument>('thumbnails', {
      name: `${tag.name}_logo`,
      source: tag.thumbnail,
    })
    const thumbId = res.id

    // * 태그 저장
    await addDocCache<Omit<TagResponse, 'id'>>('tags', {
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
