import TagAddForm from '@/components/TagAddForm'
import TagDeleteForm from '@/components/TagDeleteForm'
import TagEditForm from '@/components/TagEditForm'
import TagsList from '@/components/TagsList'
import FirebaseCollection from '@/service/Firebase/collection'
import { TagsResponse, ThumbnailsResponse } from '@/type'
import React from 'react'

export default async function tag() {
  const db = new FirebaseCollection()

  const tags = await db.getDocs<TagsResponse>('tags')
  const thumbnails = await db.getDocs<ThumbnailsResponse>('thumbnails')

  return (
    <div className='max-w-7xl m-auto'>
      <h1 className='mb-20'>Tags</h1>
      <TagsList
        tags={tags}
        thumbs={thumbnails}
      />
      <h2>Add new tag</h2>
      <TagAddForm />
      <h2>Edit</h2>
      <TagEditForm />
      <h2>Delete</h2>
      <TagDeleteForm />
    </div>
  )
}
