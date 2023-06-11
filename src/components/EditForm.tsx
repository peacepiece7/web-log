'use client'
import { Log, Tags } from '@/type'
import { randomBrightColor } from '@/utils'
import React, { useEffect, useState } from 'react'

type Props = {
  log: Log
  content: string
  tags: Tags
}
export default function EditForm({ log, content, tags }: Props) {
  const [tagsState, setTagsState] = useState(log.tags)

  useEffect(() => {
    document.getElementById('textbox')?.addEventListener('keydown', function (e: KeyboardEvent) {
      if (e.key == 'Tab') {
        e.preventDefault()
        const target = e.target as HTMLTextAreaElement
        var start = target.selectionStart
        var end = target.selectionEnd
        // set textarea value to: text before caret + tab + text after caret
        target.value = target.value.substring(0, start) + '  ' + target.value.substring(end)
        // put caret at right position again
        target.selectionStart = target.selectionEnd + 1
        target.selectionEnd = start + 2
      }
    })
  }, [])

  function updatePost() {
    const textarea = document.querySelector('.weblog-textarea') as HTMLTextAreaElement
    log.tags = tagsState
    // Edit content
    fetch('/api/update/content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        log,
        content: textarea.value,
      }),
    })

    // Edit log
    fetch('/api/update/log', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        log,
      }),
    })
  }

  function removeTag(e: React.MouseEvent<HTMLButtonElement>) {
    const targetTag = (e.target as HTMLButtonElement).textContent
    console.log(targetTag)
    setTagsState((prev) => {
      console.log(prev.filter((tag) => tag !== targetTag))
      return prev.filter((tag) => tag !== targetTag)
    })
  }
  function resetTags() {
    setTagsState(log.tags)
  }
  function addTag(e: React.ChangeEvent<HTMLSelectElement>) {
    const targetTag = (e.target as HTMLSelectElement).value
    if (targetTag === '') return
    setTagsState((prev) => {
      if (prev.includes(targetTag)) return prev
      return [...prev, targetTag]
    })
  }

  function deletePost() {
    const res = prompt('Are you sure you want to delete this post?\nso, type "delete"')
    console.log('res : ', res)
  }

  return (
    <div className='mb-12'>
      <div className='pb-5 pr-5 text-end'>
        {tagsState.map((name) => {
          const rgb = randomBrightColor(name)
          return (
            <button
              onClick={removeTag}
              style={{ backgroundColor: rgb }}
              className='p-1 ml-1 rounded-md cursor-pointer border-none'
              key={name}
            >
              {name}
            </button>
          )
        })}
        <select
          name='tag'
          onChange={addTag}
          className='ml-5'
        >
          <option value=''>Add Tag</option>
          {tags
            .sort((a, b) => {
              return a.name > b.name ? 1 : -1
            })
            .map((tag) => {
              return (
                <option
                  key={tag.name}
                  value={tag.name}
                >
                  {tag.name}
                </option>
              )
            })}
        </select>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4 border-none cursor-pointer'
          onClick={resetTags}
        >
          Reset
        </button>
      </div>
      <textarea
        id='textbox'
        className='w-full h-[60rem] weblog-textarea'
        value={content as string}
      />
      <div className='text-end'>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded max-w-[125px] h-[45px] mt-4 ml-auto border-none cursor-pointer'
          onClick={updatePost}
        >
          Update Post
        </button>
        <button
          className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded max-w-[125px] h-[45px] mt-4 ml-12 border-none cursor-pointer'
          onClick={deletePost}
        >
          Delete Post
        </button>
      </div>
    </div>
  )
}
