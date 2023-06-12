'use client'
import React from 'react'

export default function TagAddForm() {
  const [name, setName] = React.useState('')
  const [thumbnail, setThumbnail] = React.useState('')

  const addTag = () => {
    fetch('/api/add/tag', {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        thumbnail: thumbnail,
      }),
    })
  }

  return (
    <div>
      <form onSubmit={addTag}>
        <input
          className=''
          type='text'
          placeholder='Enter a tag name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type='text'
          placeholder='Enter a svg icon to svg tag'
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
