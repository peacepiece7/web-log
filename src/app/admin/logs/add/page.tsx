import FirebaseCollection from '@/service/Firebase/collection'
import { TagsResponse } from '@/type'

import AddForm from '@/components/AddForm'
import { Suspense } from 'react'

export default async function AddPost() {
  const db = new FirebaseCollection()
  const tags = await db.getDocs<TagsResponse>('tags')
  return (
    <div className='max-w-7xl m-auto'>
      <h1 className='mb-20 pl-8'>Add Log</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <AddForm tags={tags} />
      </Suspense>
    </div>
  )
}
