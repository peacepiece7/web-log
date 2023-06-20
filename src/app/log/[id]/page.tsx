import { LogsResponse } from '@/type'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'

import FirebaseCollection from '@/service/Firebase/collection'
import { FirebaseStorage } from '@/service/Firebase/storage'
import { addIdToHeader, createToc } from '@/utils'
import TableOfContent from '@/components/TableOfContent'
import ScrollToTop from '@/components/ScrollToTop'
import '@/app/viewer.css'
import { getAPI, postAPI } from '@/api'

type Props = {
  params: {
    id: string
  }
}

export default async function WebLogPage({ params }: Props) {
  // * 헤더에서 호스트를 가져와 url을 생성합니다.
  const url =
    process.env.NODE_ENV === 'development'
      ? `http://localhost:3000`
      : `https://web-log-wheat.vercel.app`

  // * logs를 가져옵니다.
  const { logs }: { logs: LogsResponse } = await getAPI(`${url}/api/get/logs`)
  const log = logs.find((log) => log.id === params.id)

  if (!log) {
    return <div>not found</div>
  }
  console.log(log)
  // * content를 가져옵니다.
  const { content }: { content: string } = await postAPI(`${url}/api/get/content`, {
    ref: log.storagePath,
  })
  if (!content) {
    return <div>not found</div>
  }
  console.log(content.length)

  // * Table of Content를 생성 합니다.
  const toc = createToc(content)

  // * markdown role을 정하고, content(markdown string)를 HTML로 변환합니다.
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
