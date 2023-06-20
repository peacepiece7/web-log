import Link from 'next/link'
import { Metadata } from 'next'

type Props = {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: 'web log | logs',
  description: '최신 로그를 확인하세요.',
}

export default function ProductLayout({ children }: Props) {
  return (
    <>
      <main>
        <div className='max-w-7xl inset-0 m-auto pl-5 pr-5'>
          <h1>Logs</h1>
          {children}
        </div>
      </main>
    </>
  )
}
