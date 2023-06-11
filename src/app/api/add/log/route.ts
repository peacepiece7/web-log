import FirebaseCollection from '@/service/Firebase/collection'
import { FirebaseStorage } from '@/service/Firebase/storage'
import { LogDocument, ThumbnailDocument } from '@/type'
import { NextResponse } from 'next/server'
import { v1 } from 'uuid'

export type AddLogRequest = {
  title: string
  tags: string[]
  createdAt: string
  lastModifiedAt: string
  thumbnailSource?: string
  content: string
  fileName: string
}

export async function POST(request: Request) {
  try {
    const log = (await request.json()) as AddLogRequest
    console.log('ADD log : ', log)
    const db = new FirebaseCollection()
    const store = new FirebaseStorage()

    const fileName = `${log.fileName}-${v1()}.md`

    // * markdown 저장
    await store.uploadContentData(`markdown/${fileName}`, log.content)

    // * 썸네일 저장
    let thumbnailId = ''
    if (log.thumbnailSource) {
      const thumbRes = await db.addDoc<ThumbnailDocument>('thumbnails', {
        name: `${fileName}_logo`,
        source: log.thumbnailSource,
      })
      thumbnailId = thumbRes.id
    }
    const logDoc: LogDocument = {
      createdAt: log.createdAt,
      lastModifiedAt: log.lastModifiedAt,
      storagePath: `markdown/${fileName}`,
      tags: log.tags,
      thumbnailId: thumbnailId,
      title: log.title,
    }
    // * 로그 저장
    const logRes = await db.addDoc<LogDocument>('logs', logDoc)
    return NextResponse.json({ state: 'success', response: { logRes } })
  } catch (error) {
    console.error(error)
    // todo : 중간까지 저장된 데이터 전부 삭제해야 함 or 에러 처리 할 수 있게 로그 남기기
    return NextResponse.json({ state: 'failure', error })
  }
}

export async function GET() {
  return NextResponse.json({ hi: 'hi!' })
}
