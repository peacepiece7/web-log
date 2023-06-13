'use client'
import { LogResponse, TagsResponse } from '@/type'
import { randomBrightColor } from '@/utils'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { DeleteRequest } from '@/app/api/delete/storage/route'
import dayjs from 'dayjs'
import { DATE_FORMAT } from '@/app/constants'

type Props = {
  log: LogResponse
  content: string
  tags: TagsResponse
}
export default function LogEditForm({ log, content, tags }: Props) {
  const [contentState, setContentState] = useState(content)
  const [tagsState, setTagsState] = useState(log.tags)
  const [title, setTitle] = useState(log.title)
  const router = useRouter()

  // todo : hooks로 뺴기
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

  async function updateLog() {
    const textarea = document.querySelector('.weblog-textarea') as HTMLTextAreaElement
    // * content의 변경사항이 있다면 업데이트 합니다.
    if (content !== contentState) {
      fetch('/api/update/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          storagePath: log.storagePath,
          content: textarea.value,
        }),
      })
    }

    // * log(Document)에 변경사항이 있다면 업데이트 합니다.
    if (
      title !== log.title ||
      JSON.stringify(tagsState) !== JSON.stringify(log.tags) ||
      content !== contentState
    ) {
      const curLog: LogResponse = {
        ...log,
        title: title,
        tags: tagsState,
        lastModifiedAt: dayjs().format(DATE_FORMAT),
      }
      fetch('/api/update/log', {
        method: 'POST',
        body: JSON.stringify(curLog),
      })
    }

    router.push('/admin/logs')
  }

  function removeTag(e: React.MouseEvent<HTMLButtonElement>) {
    const targetTag = (e.target as HTMLButtonElement).textContent
    setTagsState((prev) => {
      return prev.filter((tag) => tag !== targetTag)
    })
  }
  function resetTags() {
    setTagsState(log.tags)
  }
  function resetTitle() {
    setTitle(log.title)
  }
  function resetContent() {
    setContentState(content)
  }
  function addTag(e: React.ChangeEvent<HTMLSelectElement>) {
    const targetTag = (e.target as HTMLSelectElement).value
    if (targetTag === '') return
    setTagsState((prev) => {
      if (prev.includes(targetTag)) return prev
      return [...prev, targetTag]
    })
  }

  async function deleteLog() {
    const trigger = prompt('Are you sure you want to delete this post?\nso, type "delete"')
    if (trigger !== 'delete') return

    const body: DeleteRequest = {
      logId: log.id,
      thumbnailId: log.thumbnailId,
      storagePath: log.storagePath,
    }
    await fetch('/api/delete/storage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    router.push('/admin/logs')
  }

  return (
    <div className='mb-12'>
      <div className='flex'>
        <input
          className='border border-solid border-gray-300 rounded-md w-96 text-2xl'
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded ml-4 border-none cursor-pointer'
          onClick={resetTitle}
        >
          Reset
        </button>
      </div>
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
      <div className='mt-4 mb-2'>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border-none cursor-pointer'
          onClick={resetContent}
        >
          Reset Content
        </button>
      </div>
      <textarea
        id='textbox'
        className='w-full h-[60rem] weblog-textarea'
        value={contentState as string}
        onChange={(e) => setContentState(e.target.value)}
      />
      <div className='text-end'>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded max-w-[125px] h-[45px] mt-4 ml-auto border-none cursor-pointer'
          onClick={updateLog}
        >
          Update Post
        </button>
        <button
          className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded max-w-[125px] h-[45px] mt-4 ml-12 border-none cursor-pointer'
          onClick={deleteLog}
        >
          Delete Post
        </button>
      </div>
    </div>
  )
}
