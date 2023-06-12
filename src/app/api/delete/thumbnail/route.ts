import FirebaseCollection from '@/service/Firebase/collection'

import { ThumbnailResponse } from '@/type'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ThumbnailResponse
    const db = new FirebaseCollection()
    await db.deleteDoc('tags', body.id)
    return { status: 'success', response: '' }
  } catch (error) {
    console.error(error)
    return { status: 'failure', error }
  }
}

export async function GET() {
  return NextResponse.json({ hi: 'hi!' })
}
