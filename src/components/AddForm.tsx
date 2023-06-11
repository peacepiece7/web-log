'use client'
import React, { useEffect, useState } from 'react'
import { Log, Tags } from '@/type'
import { randomBrightColor } from '@/utils'

type Props = {
  tags: Tags
}
export default function AddForm({ tags }: Props) {
  useEffect(() => {
    document.getElementById('textbox')?.addEventListener('keydown', function (e: KeyboardEvent) {
      if (e.key == 'Tab') {
        e.preventDefault()
        const target = e.target as HTMLTextAreaElement
        var start = target.selectionStart
        var end = target.selectionEnd
        // set textarea value to: text before caret + tab + text after caret
        target.value = target.value.substring(0, start) + '  ' + target.value.substring(end)
        // put caret at right position again
        target.selectionStart = target.selectionEnd + 1
        target.selectionEnd = start + 2
      }
    })
  }, [])

  return <div>AddForm</div>
}
