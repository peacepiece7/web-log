import { LogsResponse } from '@/type'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'

import FirebaseCollection from '@/service/Firebase/collection'
import { FirebaseStorage } from '@/service/Firebase/storage'
import { addIdToHeader, createToc } from '@/utils'
import TableOfContent from '@/components/TableOfContent'
import ScrollToTop from '@/components/ScrollToTop'
import '@/app/viewer.css'

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

  const content = await storage.getContentData(log.storagePath)
  const toc = createToc(content)
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
  const html = addIdToHeader(mdRole.render(content))

  return (
    <div>
      <section className='flex flex-col items-center'>
        <h1 className='text-4xl text-center'>{log.title}</h1>
        <TableOfContent toc={toc} />
        <div
          id='markdown-body'
          className='max-w-7xl w-full pl-8 pr-8'
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <ScrollToTop />
      </section>
    </div>
  )
}

export async function generateStaticParams() {
  const db = new FirebaseCollection()
  const logs = await db.getDocs<LogsResponse>('logs')
  return logs.map((log) => ({ id: log.id }))
}
