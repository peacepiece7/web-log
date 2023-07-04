import { LogDocument, TagsResponse } from '@/type'
import { NextResponse } from 'next/server'
import { getDocsCache } from '@/service/Firebase_fn/collection'

// todo : 트렌잭션 기능 사용하기

export async function GET() {
  try {
    const tags = await getDocsCache<TagsResponse>('tags')
    return NextResponse.json(tags)
  } catch (error) {
    console.error(error)
    return { tags: [] }
  }
}
