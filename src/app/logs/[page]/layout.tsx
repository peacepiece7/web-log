import { Suspense } from 'react'

export const metadata = {
  title: 'Web Log | logs',
  description: 'Playground for me',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='max-w-7xl inset-0 m-auto pl-5 pr-5 mb-12'>
      <h1>Logs</h1>
      <Suspense fallback={<div>LOADING...</div>}>{children}</Suspense>
    </div>
  )
}
