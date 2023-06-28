'use client'
import React from 'react'
import './markdownViewer.css'

export default function MarkdownViewer({ html }: { html: string }) {
  return (
    <div
      id='markdown-body'
      className='max-w-7xl w-full pl-8 pr-8'
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
