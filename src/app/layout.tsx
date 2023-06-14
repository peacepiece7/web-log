import { Azeret_Mono } from 'next/font/google'

import Header from '@/components/Header'
import './globals.css'

const AzeretMonoFont = Azeret_Mono({
  subsets: ['latin'],
  variable: '--font-azeret-mono',
  display: 'swap',
})
export const metadata = {
  title: 'Web Log',
  description: 'Playground for me',
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Root Layout의 body안에 컴포넌트를 넣지 않으면 Suspense boundary 외부로 인식됩니다.
  // SSR화면과 CSR Hydration 후 화면을 다르게 그리는 에러가 발생합니다.
  // * 즉 Root Layout은 body안에 컴포넌트를 넣으면 됩니다.
  return (
    <html
      lang='kor'
      className={`${AzeretMonoFont.className}`}
    >
      <body>
        {/* @ts-expect-error Async Server Component */}
        <Header />
        {children}
      </body>
    </html>
  )
}
