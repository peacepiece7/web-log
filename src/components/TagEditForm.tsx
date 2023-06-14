'use client'
import { LogsResponse, TagResponse, ThumbnailResponse } from '@/type'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Props = {
  tag: TagResponse
  thumb: ThumbnailResponse
  logs: LogsResponse
}
export default function TagEditForm({ logs, tag: tagProp, thumb: thumbProp }: Props) {
  const [tagName, setTagName] = useState(tagProp.name)
  const [source, setSource] = useState(thumbProp.source)
  const router = useRouter()

  async function updateTag() {
    // * 태그 이름이 변경되면 태그 이름과 로그를 업데이트 합니다.
    if (tagName !== tagProp.name) {
      const tag: TagResponse = {
        ...tagProp,
        name: tagName,
      }
      await fetch('/api/update/tag', {
        method: 'POST',
        body: JSON.stringify(tag),
      })
      logs.forEach((log) => {
        const isExist = log.tags.find((tag) => tag === tagProp.name)
        if (!isExist) return
        log.tags = log.tags.map((tag) => (tag === tagProp.name ? tagName : tag))
        fetch('/api/update/log', {
          method: 'POST',
          body: JSON.stringify(log),
        })
      })
    }
    // * 썸네일이 변경되면 업데이트 합니다.
    if (source !== thumbProp.source) {
      const thumb: ThumbnailResponse = {
        ...thumbProp,
        source,
      }
      await fetch('/api/update/thumbnail', {
        method: 'POST',
        body: JSON.stringify(thumb),
      })
    }
    router.push('/admin/tags')
  }
  async function deleteTag() {
    const trigger = prompt('Are you sure you want to delete this tag?\nso, type "delete"')
    if (trigger !== 'delete') return

    await fetch('/api/delete/tag', {
      method: 'POST',
      body: JSON.stringify(tagProp),
    })

    await fetch('/api/delete/thumbnail', {
      method: 'POST',
      body: JSON.stringify(thumbProp),
    })

    logs.forEach((log) => {
      const isExist = log.tags.find((tag) => tag === tagProp.name)
      if (!isExist) return
      log.tags = log.tags.filter((tag) => tag !== tagProp.name)
      fetch('/api/update/log', {
        method: 'POST',
        body: JSON.stringify(log),
      })
    })
    router.push('/admin/tags')
  }

  const resetTagName = () => setTagName(tagProp.name)
  const resetSource = () => setSource(thumbProp.source)

  return (
    <div className='mb-12'>
      <p className='text-red-500'>
        문서 구조상 태그를 변경, 삭제하는 작업은 상당한 비용이 듭니다. 신중하게 결정 해주세요!
      </p>
      <div className='flex pt-12'>
        <input
          className='border border-solid border-gray-300 rounded-md w-96 text-2xl'
          type='text'
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
        />
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded ml-4 border-none cursor-pointer'
          onClick={resetTagName}
        >
          Reset Tag Name
        </button>
      </div>
      <div className='flex pt-12'>
        <input
          className='border border-solid border-gray-300 rounded-md w-96 text-2xl'
          type='text'
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded ml-4 border-none cursor-pointer'
          onClick={resetSource}
        >
          Reset Source
        </button>
      </div>

      <div className='text-end'>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded max-w-[125px] h-[45px] mt-4 ml-auto border-none cursor-pointer'
          onClick={updateTag}
        >
          Update Post
        </button>
        <button
          className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded max-w-[125px] h-[45px] mt-4 ml-12 border-none cursor-pointer'
          onClick={deleteTag}
        >
          Delete Post
        </button>
      </div>
    </div>
  )
}
