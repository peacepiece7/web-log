import { TagResponse } from '@/type'
import { deleteDocCache } from '@/service/Firebase_fn/collection'

// * Delete Tag API
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as TagResponse

    await deleteDocCache('tags', body.id)

    return { status: 'success', response: '' }
  } catch (error) {
    console.error(error)
    return { status: 'failure', error }
  }
}
