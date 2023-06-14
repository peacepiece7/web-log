import { TagResponse } from '@/type'
import FirebaseCollection from '@/service/Firebase/collection'

// * Delete Tag API
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as TagResponse
    const db = new FirebaseCollection()

    await db.deleteDoc('tags', body.id)

    return { status: 'success', response: '' }
  } catch (error) {
    console.error(error)
    return { status: 'failure', error }
  }
}
