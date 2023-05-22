import React from 'react'
import fileData from '@/service/getFileData'
import { ContentData } from '@/type'
import MarkdownIt from 'markdown-it'

type Props = {
  params: {
    id: string
  }
}

export default function WebLogPage({ params }: Props) {
  const content = fileData.getContent<ContentData>()
  // throw new Error Or redirect해버리기
  if (!content) return <div>Not Found</div>

  const md = new MarkdownIt()
  const result = md.render(content[params.id].content)
  return (
    <div>
      Web Log
      <section
        id='markdown-body'
        dangerouslySetInnerHTML={{ __html: result }}
      />
    </div>
  )
}

/**
 * @description 배열 안에 객체가 있는 형태를 리턴해야 SSG가 동작합니다.
 * @example [{ id: '1' }, { id: '2' }]
 */
export function generateStaticParams() {
  const contents = fileData.getContent<ContentData>()
  if (!contents) return []

  return Object.keys(contents).map((key) => ({ id: key }))
}
