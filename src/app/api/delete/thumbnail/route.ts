import { ThumbnailResponse } from '@/type'
import FirebaseCollection from '@/service/Firebase/collection'

// * Delete Thumbnail API
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ThumbnailResponse
    const db = new FirebaseCollection()

    await db.deleteDoc('thumbnails', body.id)

    return { status: 'success', response: '' }
  } catch (error) {
    console.error(error)
    return { status: 'failure', error }
  }
}
