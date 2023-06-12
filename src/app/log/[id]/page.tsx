import React from 'react'
import { LogsResponse } from '@/type'
import FirebaseCollection from '@/service/Firebase/collection'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import { FirebaseStorage } from '@/service/Firebase/storage'
import { addIdToStringHTML, createToc } from '@/utils'
import TableOfContent from '@/components/TableOfContent'
import './styles.css'

type Props = {
  params: {
    id: string
  }
}

export default async function WebLogPage({ params }: Props) {
  // * firebase에서 log를 가져옵니다.
  const db = new FirebaseCollection()
  const storage = new FirebaseStorage()
  const logs = await db.getDocs<LogsResponse>('logs')
  const log = logs.find((log) => log.id === params.id)
  if (!log) {
    return <div>not found</div>
  }

  // * firebase에서 content를 가져옵니다.
  const content = await storage.getStreamData(log.storagePath)

  // * Table of content를 생성합니다.
  const toc = createToc(content)

  // * Markdown to HTML 규칙을 생성합니다.
  const mdRole = new MarkdownIt({
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

  const html = addIdToStringHTML(mdRole.render(content))

  return (
    <div>
      <section className='flex flex-col items-center'>
        <h1 className='text-7xl'>{log.title}</h1>
        <TableOfContent toc={toc} />
        <div
          id='markdown-body'
          className='max-w-7xl w-full pl-8 pr-8'
          dangerouslySetInnerHTML={{ __html: html }}
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
