import FirebaseCollection from '@/service/Firebase/collection'
import { FirebaseStorage } from '@/service/Firebase/storage'
import { Log } from '@/type'
import { NextResponse } from 'next/server'
import { v1 } from 'uuid'

export async function POST(request: Request) {
  try {
    const data = (await request.json()) as {
      title: string
      thumbnail: string
      tags: string[]
      content: string
      fileName: string
      thumbnailId: string
      createdAt: string
      lastModifiedAt: string
    }
    const db = new FirebaseCollection()
    const store = new FirebaseStorage()

    // 썸네일 저장
    if (data.thumbnail) {
      const thumbRes = await db.addDoc('thumbnails', { name: data.tags[0], source: data.thumbnail })
      data.thumbnailId = thumbRes.id
    }

    const log: Omit<Log, 'id'> = {
      title: data.title,
      thumbnailId: data.thumbnailId,
      tags: data.tags,
      createdAt: data.createdAt,
      lastModifiedAt: data.lastModifiedAt,
      storagePath: `markdown/${data.fileName}-${v1()}.md`,
    }

    // markdown 저장
    await store.uploadContentData({ log: log, content: data.content })

    const logRes = await db.addDoc('logs', log)

    return NextResponse.json({ state: 'success', response: logRes })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ state: 'failure', error: error })
  }
}

export async function GET() {
  return NextResponse.json({ hi: 'hi' })
}
