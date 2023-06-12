import FirebaseCollection from '@/service/Firebase/collection'
import { TagResponse } from '@/type'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const tag = (await request.json()) as TagResponse
    const db = new FirebaseCollection()
    const tagId = tag.id
    const { id, ...tagData } = tag

    const response = await db.setDoc<Omit<TagResponse, 'id'>>('tags', tagId, tagData)

    return NextResponse.json({ state: 'success', response })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ state: 'failure', error })
  }
}

export async function GET() {
  return NextResponse.json({ state: 'success' })
}
