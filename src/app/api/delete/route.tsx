import FirebaseCollection from '@/service/Firebase/collection'
import { FirebaseStorage } from '@/service/Firebase/storage'
import { LogDocument, ThumbnailDocument } from '@/type'
import { NextResponse } from 'next/server'

export type DeleteRequest = {
  logId: string
  thumbnailId?: string
  storagePath: string
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as DeleteRequest
    const db = new FirebaseCollection()
    const storage = new FirebaseStorage()
    if (body.thumbnailId) db.deleteDoc('thumbnails', body.thumbnailId)
    await storage.deleteContentData(body.storagePath)
    await db.deleteDoc('logs', body.logId)

    return { status: 'success', response: '' }
  } catch (error) {
    console.error(error)
    return { status: 'failure', error }
  }
}

export async function GET() {
  return NextResponse.json({ hi: 'hi!' })
}
