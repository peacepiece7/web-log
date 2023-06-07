import React from 'react'
import fileData from '@/service/getFileData'
import { Contents, Logs, Log, Content } from '@/type'
import FirebaseCollection from '@/service/Firebase/collection'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
// import h1lg from "highlight.js/lib/languages/h1lg";

type Props = {
  params: {
    id: string
  }
}

export default async function WebLogPage({ params }: Props) {
  const db = new FirebaseCollection()
  const logs = await db.getDocs<Logs>('logs')
  const log = logs.find((log) => log.id === params.id) as Log
  const content = await db.getDocById<Content>('contents', log.contentId)

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
      return '' // use external default escaping
    },
  })
  // todo : fs로 파일을 읽어서 랜더링합니다. `fs.readFileSync(content[params.id].filename, 'utf-8') 이런식으로 가져옵시당.
  // 아니면 모든 페이지를 api요청 보내서 컨텐츠 받아와서 SSG로 만듭니다.
  const result = md.render(content.content)

  return (
    <div>
      <section className='flex flex-col items-center'>
        <h1>{'title'}</h1>
        <div
          id='markdown-body'
          className='max-w-7xl w-full'
          dangerouslySetInnerHTML={{ __html: result }}
        />
      </section>
    </div>
  )
}

/**
 * @description 배열 안에 객체가 있는 형태를 리턴해야 SSG가 동작합니다.
 * @description [slug]에서 slug외 다른 속성은 추가할 수 없습니다.
 * @example [{ id: '1' }, { id: '2' }]
 */
export async function generateStaticParams() {
  const db = new FirebaseCollection()
  const logs = await db.getDocs<Logs>('logs')
  return logs.map((log) => ({ slug: log.contentId }))
}
