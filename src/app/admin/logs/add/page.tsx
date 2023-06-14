import { TagsResponse } from '@/type'
import { Suspense } from 'react'

import FirebaseCollection from '@/service/Firebase/collection'
import LogAddForm from '@/components/LogAddForm'

export default async function AddPost() {
  const db = new FirebaseCollection()
  const tags = await db.getDocs<TagsResponse>('tags')

  return (
    <div className='max-w-7xl m-auto'>
      <h1 className='mb-20 pl-8'>Admin Add Log</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <LogAddForm tags={tags} />
      </Suspense>
    </div>
  )
}
