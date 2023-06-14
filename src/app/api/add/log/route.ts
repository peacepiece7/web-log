import { LogDocument, ThumbnailDocument } from '@/type'
import { NextResponse } from 'next/server'
import { v1 } from 'uuid'

import FirebaseCollection from '@/service/Firebase/collection'
import { FirebaseStorage } from '@/service/Firebase/storage'

// * Add Log API
export async function POST(request: Request) {
  try {
    const log = (await request.json()) as AddLogRequest
    const db = new FirebaseCollection()
    const store = new FirebaseStorage()
    const fileName = `${log.fileName}-${v1()}.md`

    // * markdown 저장
    await store.uploadContentData(`markdown/${fileName}`, log.content)

    // * 썸네일 저장
    let thumbnailId = ''
    if (typeof log.thumbnailSource !== 'undefined') {
      const thumbRes = await db.addDoc<ThumbnailDocument>('thumbnails', {
        name: `${fileName}_logo`,
        source: log.thumbnailSource,
      })
      thumbnailId = thumbRes.id
    }

    // * 로그 저장
    const logDoc: LogDocument = {
      createdAt: log.createdAt,
      lastModifiedAt: log.lastModifiedAt,
      storagePath: `markdown/${fileName}`,
      tags: log.tags,
      thumbnailId: thumbnailId,
      title: log.title,
    }
    await db.addDoc<LogDocument>('logs', logDoc)

    return NextResponse.json({ state: 'success', response: '' })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ state: 'failure', error })
  }
}

export type AddLogRequest = {
  title: string
  tags: string[]
  createdAt: string
  lastModifiedAt: string
  thumbnailSource?: string
  content: string
  fileName: string
}

// todo : 트렌잭션 기능 사용하기
