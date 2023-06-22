import { deleteDocCache } from '@/service/Firebase_fn/collection'
import { deleteContentDataCache } from '@/service/Firebase_fn/storage'

// * Delete Log API
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as DeleteRequest

    // * 로그 삭제
    await deleteDocCache('logs', body.logId)

    // * 저장소에서 markdown 파일 삭제
    await deleteContentDataCache(body.storagePath)

    return { status: 'success', response: '' }
  } catch (error) {
    console.error(error)
    return { status: 'failure', error }
  }
}

export type DeleteRequest = {
  logId: string
  thumbnailId?: string
  storagePath: string
}
