import FirebaseCollection from '@/service/Firebase/collection'
import { FirebaseStorage } from '@/service/Firebase/storage'

// * Delete Log API
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as DeleteRequest
    const db = new FirebaseCollection()
    const storage = new FirebaseStorage()

    // * 썸네일이 있다면 삭제
    if (body.thumbnailId) db.deleteDoc('thumbnails', body.thumbnailId)

    // * 로그 삭제
    await db.deleteDoc('logs', body.logId)

    // * 저장소에서 markdown 파일 삭제
    await storage.deleteContentData(body.storagePath)

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
