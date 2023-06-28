'use client'
import { Toc } from '@/utils'

type Props = {
  toc: Toc[]
}
export default function TableOfContent({ toc: tocProp }: Props) {
  const toc = tocProp
    .map((content) => {
      return `<li data-level="${content.level}"><a href="#${content.text.replaceAll(' ', '_')}" >
      ${content.text}</a></li>`
    })
    .join('')

  return (
    <div className='w-full p-4 mb-36'>
      <div className='max-w-2xl  p-4 pr-0 mt-24 m-auto'>
        <h2 className='text-3xl'>Table of Contents</h2>
        <ol
          id='toc'
          className='flex flex-col p-4 mt-12 max-h-[400px] overflow-y-auto border-[1px] border-solid border-gray-300 rounded-md'
          dangerouslySetInnerHTML={{ __html: toc }}
        />
      </div>
    </div>
  )
}
