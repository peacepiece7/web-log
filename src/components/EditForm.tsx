'use client'
import { Log } from '@/type'
import React, { useEffect } from 'react'

type Props = {
  log: Log
  content: string
}
export default function EditForm({ log, content }: Props) {
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
  })

  function updatePost() {
    const textarea = document.querySelector('.weblog-textarea') as HTMLTextAreaElement
    fetch('/update/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        log,
        content: textarea.value,
      }),
    })
  }
  return (
    <div>
      <textarea
        id='textbox'
        className='w-full h-[60rem] weblog-textarea'
        defaultValue={content as string}
      />
      <div className='text-end'>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded max-w-[125px] h-[45px] mt-4 ml-auto border-none cursor-pointer'
          onClick={updatePost}
        >
          Update Post
        </button>
      </div>
    </div>
  )
}
