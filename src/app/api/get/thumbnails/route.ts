import { LogDocument } from '@/type'
import { NextResponse } from 'next/server'

import FirebaseCollection from '@/service/Firebase/collection'

export async function GET() {
  try {
    const db = new FirebaseCollection()
    const thumbnails = await db.getDocs<LogDocument>('thumbnails')
    return NextResponse.json({ thumbnails })
  } catch (error) {
    console.error(error)
    return { logs: [] }
  }
}
