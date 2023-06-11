import TagAddForm from '@/components/TagAddForm'
import TagDeleteForm from '@/components/TagDeleteForm'
import TagEditForm from '@/components/TagEditForm'
import React from 'react'

export default function tag() {
  return (
    <div className='max-w-7xl m-auto'>
      <h1 className='mb-20'>Tag Management</h1>
      <h2>Add</h2>
      <TagAddForm />
      <h2>Edit</h2>
      <TagEditForm />
      <h2>Delete</h2>
      <TagDeleteForm />
    </div>
  )
}
