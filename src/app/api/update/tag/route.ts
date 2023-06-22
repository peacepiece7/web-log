import { TagResponse } from '@/type'
import { NextResponse } from 'next/server'
import { setDocCache } from '@/service/Firebase_fn/collection'

// * Update Tag API
export async function POST(request: Request) {
  try {
    const tag = (await request.json()) as TagResponse
    const { id, ...tagData } = tag
    const response = await setDocCache<Omit<TagResponse, 'id'>>('tags', id, tagData)

    return NextResponse.json({ state: 'success', response })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ state: 'failure', error })
  }
}
