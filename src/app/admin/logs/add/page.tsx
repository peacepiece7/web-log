import { TagsResponse } from '@/type'
import { Suspense } from 'react'

import LogAddForm from '@/components/LogAddForm'
import { getDocsCache } from '@/service/Firebase_fn/collection'

export default async function AddPost() {
  const { tags } = await getDocsCache<TagsResponse>('tags')

  return (
    <div className='max-w-7xl m-auto'>
      <h1 className='mb-20 pl-8'>Admin Add Log</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <LogAddForm tags={tags} />
      </Suspense>
    </div>
  )
}
