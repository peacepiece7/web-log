import { LogsResponse } from '@/type'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'

import { addIdToHeader, createToc } from '@/utils'
import TableOfContent from '@/components/TableOfContent'
import ScrollToTop from '@/components/ScrollToTop'
import '@/app/viewer.css'
import { getDocsCache } from '@/service/Firebase_fn/collection'
import { getContentDataCache } from '@/service/Firebase_fn/storage'

type Props = {
  params: {
    id: string
  }
}

// const { log, content }: { log: LogResponse | undefined; content: string } =
// await logsPromise.then((logs) => {
//   let log = logs.find((log) => log.id === params.id)
//   const contentPromise = getContentDataCache(log?.storagePath)
//   return contentPromise.then((content) => {
//     return { log, content: content ? content : '' }
//   })
// })

export default async function WebLogPage({ params }: Props) {
  // const logs = await getDocsCache<LogsResponse>('logs')

  const logsPromise = getDocsCache<LogsResponse>('logs')
  const logs = await logsPromise
  const log = logs.find((log) => log.id === params.id)
  if (!log) {
    return <div>not found</div>
  }
  const contentPromise = getContentDataCache(log.storagePath)
  const content = await contentPromise

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
  const logs = await getDocsCache<LogsResponse>('logs')
  return logs.map((log) => ({ id: log.id }))
}
