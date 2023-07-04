import { Metadata } from 'next'
import { LogsResponse } from '@/type'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'

import { addIdToHeader, createToc } from '@/utils'
import TableOfContent from '@/components/TableOfContent'
import ScrollToTop from '@/components/ScrollToTop'
import MarkdownViewer from '@/components/MarkdownViewer'
import { getContentFetcher, getFetcher } from '@/service/fetcher'

type Props = {
  params: {
    id: string
  }
}

export default async function WebLogPage({ params }: Props) {
  const response = await getFetcher('logs')
  const logs = response[0].logs as LogsResponse

  // todo log 없을 경우 처리
  const log = logs.find((log) => log.id === params.id)
  const content = await getContentFetcher(log?.storagePath!)

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
    <div className='mb-12'>
      <section className='flex flex-col items-center'>
        <h1 className='text-4xl text-center'>{log?.title}</h1>
        <TableOfContent toc={toc} />
        <MarkdownViewer html={html} />
        <ScrollToTop />
      </section>
    </div>
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const response = await getFetcher('logs')
  const logs = response[0].logs as LogsResponse
  const log = logs.find((log) => log.id === params.id)

  return {
    title: `Web log | ${log?.title}`,
    description: `${log?.title} 포스팅`,
    keywords: `${log?.tags.join(', ')}`,
  }
}

export async function generateStaticParams() {
  const response = await getFetcher('logs')
  const logs = response[0].logs as LogsResponse
  return logs.map((log) => ({ id: log.id }))
}
