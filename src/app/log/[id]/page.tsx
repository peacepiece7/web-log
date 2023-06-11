import React from 'react'
import { LogsResponse } from '@/type'
import FirebaseCollection from '@/service/Firebase/collection'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import { FirebaseStorage } from '@/service/Firebase/storage'

type Props = {
  params: {
    id: string
  }
}

export default async function WebLogPage({ params }: Props) {
  const db = new FirebaseCollection()
  const storage = new FirebaseStorage()

  const logs = await db.getDocs<LogsResponse>('logs')
  const log = logs.find((log) => log.id === params.id)

  if (!log) {
    return <div>not found</div>
  }

  const content = await storage.getStreamData(log.storagePath)

  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(str, { language: lang }).value
        } catch (__) {}
      }
      return ''
    },
  })

  return (
    <div>
      <section className='flex flex-col items-center'>
        <h1>{'title'}</h1>
        <div
          id='markdown-body'
          className='max-w-7xl w-full'
          dangerouslySetInnerHTML={{ __html: md.render(content) }}
        />
      </section>
    </div>
  )
}

export async function generateStaticParams() {
  const db = new FirebaseCollection()
  const logs = await db.getDocs<LogsResponse>('logs')
  return logs.map((log) => ({ slug: log.id }))
}
