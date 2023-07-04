import { LogDocument, ThumbnailDocument } from '@/type'
import { NextResponse } from 'next/server'
import { v1 } from 'uuid'

import { addDocCache } from '@/service/Firebase_fn/collection'
import { uploadContentDataCache } from '@/service/Firebase_fn/storage'

// * Add Log API
export async function POST(request: Request) {
  try {
    const log = (await request.json()) as AddLogRequest
    const fileName = `${log.fileName}-${v1()}.md`

    // * markdown 저장
    await uploadContentDataCache(`markdown/${fileName}`, log.content)

    // * 로그 저장
    const logDoc: LogDocument = {
      createdAt: log.createdAt,
      lastModifiedAt: log.lastModifiedAt,
      storagePath: `markdown/${fileName}`,
      tags: log.tags,
      thumbnailId: log.thumbnailId,
      title: log.title,
    }
    await addDocCache<LogDocument>('logs', logDoc)

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
  thumbnailId?: string
  content: string
  fileName: string
}
