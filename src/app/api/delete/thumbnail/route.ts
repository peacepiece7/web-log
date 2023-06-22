import { ThumbnailResponse } from '@/type'
import { deleteDocCache } from '@/service/Firebase_fn/collection'

// * Delete Thumbnail API
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ThumbnailResponse

    await deleteDocCache('thumbnails', body.id)

    return { status: 'success', response: '' }
  } catch (error) {
    console.error(error)
    return { status: 'failure', error }
  }
}
