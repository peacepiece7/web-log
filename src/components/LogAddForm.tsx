'use client'
import { TagsResponse } from '@/type'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import dayjs from 'dayjs'

import { AddLogRequest } from '@/app/api/add/log/route'
import { randomBrightColor } from '@/utils'
import { DATE_FORMAT } from '@/constants'
import Preview from '@/components/Preview'

type Props = {
  tags: TagsResponse
}
export default function LogAddForm({ tags }: Props) {
  const [fileName, setFileName] = useState('example')
  const [title, setTitle] = useState('')
  const [thumbnailName, setThumbnailName] = useState('')
  const [tagsState, setTagsState] = useState([] as string[])
  const [content, setContent] = useState('')

  const router = useRouter()

  useEffect(() => {
    // * tab키를 누르면 2칸 들여쓰기가 되도록 합니다.
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

  function addTag(e: React.ChangeEvent<HTMLSelectElement>) {
    const targetTag = (e.target as HTMLSelectElement).value
    if (targetTag === '') return
    setTagsState((prev) => (prev.includes(targetTag) ? prev : [...prev, targetTag]))
  }

  function removeTag(e: React.MouseEvent<HTMLButtonElement>) {
    const targetTag = (e.target as HTMLButtonElement).textContent
    setTagsState((prev) => prev.filter((tag) => tag !== targetTag))
  }

  async function addPost() {
    const thumb = tags.find((tag) => tag.name === thumbnailName)
    thumb?.thumbnailId
    const date = dayjs().format(DATE_FORMAT)
    const contentIncludesHashLink = content
      .split('\n')
      .map((line) => {
        if (!line.startsWith('#')) return line
        const [hash, ...rest] = line.split(' ')
        const title = `[${rest.join('')}](#${rest.join('_')})`
        return `${hash} ${title}`
      })
      .join('\n')
    const log: AddLogRequest = {
      title: title,
      thumbnailId: thumb?.thumbnailId,
      tags: tagsState,
      content: contentIncludesHashLink,
      createdAt: date,
      lastModifiedAt: date,
      fileName: fileName,
    }
    await fetch('/api/add/log', {
      method: 'POST',
      body: JSON.stringify(log),
    })
    router.push('/admin/logs')
  }

  const resetTags = () => setTagsState([])

  return (
    <div className='flex'>
      <div className='flex-1 mb-12 pl-4 pr-4'>
        <div className='pb-5 pr-5 text-end flex flex-wrap'>
          <input
            className='border border-solid border-gray-300 rounded-md p-1 mt-4 w-96 text-2xl  ml-4'
            type='text'
            value={title}
            placeholder='Enter a title'
            onChange={(e) => setTitle(e.target.value)}
          />
          <select
            name='tag'
            onChange={(e) => setThumbnailName(e.target.value)}
            className='border border-solid border-gray-300 rounded-md p-1 mt-4 ml-5'
          >
            <option value=''>Add Thumbnail By Tag</option>
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

          <select
            name='tag'
            onChange={addTag}
            className='border border-solid border-gray-300 rounded-md p-1 mt-4 ml-5'
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
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4 mt-4 border-none cursor-pointer'
            onClick={resetTags}
          >
            Remove all
          </button>
        </div>
        <div className='mt-4 mb-4'>
          {tagsState.map((name) => {
            const rgb = randomBrightColor(name)
            return (
              <button
                onClick={removeTag}
                style={{ backgroundColor: rgb }}
                className='p-1 mr-4 rounded-md cursor-pointer border-none'
                key={name}
              >
                {name}
              </button>
            )
          })}
        </div>
        <textarea
          id='textbox'
          className='w-full h-[60rem] weblog-textarea'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className='text-end  mt-4'>
          <p className='text-red-600'>Warnning : Be sure to remove special characters or spaces!</p>
          <input
            className='border border-solid border-gray-300 rounded-md p-1 w-96 text-2xl'
            type='text'
            value={fileName}
            placeholder='Enter a file name'
            onChange={(e) => setFileName(e.target.value)}
          />
        </div>
        <div className='text-end'>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded max-w-[125px] h-[45px] mt-4 ml-auto border-none cursor-pointer'
            onClick={addPost}
          >
            Add Post
          </button>
        </div>
      </div>
      <Preview content={content}></Preview>
    </div>
  )
}
