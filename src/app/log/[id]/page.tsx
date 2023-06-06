import React from 'react'
import fileData from '@/service/getFileData'
import { ContentData, LogData } from '@/type'
import MarkdownIt from 'markdown-it'

type Props = {
  params: {
    id: string
  }
}

export default function WebLogPage({ params }: Props) {
  const content = fileData.getContent<ContentData>()
  // * 임시 title 가져오는 로직
  const logData = fileData.getLogInformation<LogData>()
  let title = ''
  logData?.webLog.map((log) => {
    if (log.contentID === params.id) {
      title = log.title
    }
  })

  // throw new Error Or redirect해버리기
  if (!content) return <div>Not Found</div>
  const md = new MarkdownIt()
  // todo : fs로 파일을 읽어서 랜더링합니다. `fs.readFileSync(content[params.id].filename, 'utf-8') 이런식으로 가져옵시당.
  // 아니면 모든 페이지를 api요청 보내서 컨텐츠 받아와서 SSG로 만듭니다.
  const result = md.render(content[params.id].content)
  return (
    <div>
      <h1>{title}</h1>
      <section
        id='markdown-body'
        dangerouslySetInnerHTML={{ __html: result }}
      />
    </div>
  )
}

/**
 * @description 배열 안에 객체가 있는 형태를 리턴해야 SSG가 동작합니다.
 * @description [slug]에서 slug외 다른 속성은 추가할 수 없습니다.
 * @example [{ id: '1' }, { id: '2' }]
 */
export function generateStaticParams() {
  const contents = fileData.getContent<ContentData>()
  if (!contents) return []
  return Object.keys(contents).map((key) => ({ id: key, title: 'TEST!' }))
}
