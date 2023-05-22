import React from 'react'

import MarkdownIt from 'markdown-it'

export default function WebLogPage() {
  const md = new MarkdownIt()
  const result = md.render('# markdown-it rulezz!')
  console.log('RESULT : ', result)
  return (
    <div>
      Web Log
      <aside>{result}</aside>
    </div>
  )
}
