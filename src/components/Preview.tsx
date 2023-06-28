'use client'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'

import { addIdToHeader } from '@/utils'
import MarkdownViewer from './MarkdownViewer'

type Props = {
  content: string
}
export default function Preview({ content }: Props) {
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
  const html = addIdToHeader(mdRole.render(content))

  return (
    <div className='flex-1 mr-4'>
      <h2>Preview</h2>
      <MarkdownViewer html={html} />
    </div>
  )
}
