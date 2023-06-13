import FirebaseCollection from '@/service/Firebase/collection'
import { TagsResponse } from '@/type'

import { Suspense } from 'react'
import TagAddForm from '@/components/TagAddForm'

export default async function AddPost() {
  const db = new FirebaseCollection()
  const tags = await db.getDocs<TagsResponse>('tags')
  return (
    <div className='max-w-7xl m-auto'>
      <h1 className='mb-20 pl-8'>Admin Add Tag</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <TagAddForm />
      </Suspense>
    </div>
  )
}
