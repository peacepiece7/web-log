# Next.js 13

Next.js 13 버전은 12 버전과 다른 프레임워크라고 할 정도로 많은 부분이 변경되었습니다.

모든 내용을 다룰 수 없기 때문에 13 버전에서 변경된 기능 위주로 알아보겠습니다.

Next.js 13.4.3을 기준으로 작성했습니다.

아직 베타 버전이기 떄문에 변경된 내용이 있을 수 있습니다.

# Routing

라우팅 경로가 `pages`에서 `app`으로 변경되었습니다.

## 페이지 별로 제공되는 기능

- **layout.js** 상태를 공유하는 공통 UI 컴포넌트 입니다.
- **template.js** 컴포넌트 인스턴스로 layout과 같지만 상태가 공유되진 않습니다.
- **error.js** React error boundary입니다.
- **loading.js** React suspense boundary입니다.
- **not-found.js** React error boundary입니다.
- **page.js** 유니크한 route입니다. UI를 랜더링 합니다.
- **route.js** server-side API의 엔드포인트 루트입니다. app/api 디렉터리 안에 있어야 합니다.

- **global-error** 최상위 에러로 root layout.js를 대체합니다.

## Parallel Routes

대쉬보드처럼 경로가 병렬일 경우 폴더명 앞에 `@`를 붙여서 Parallel Routes를 사용할 수 있습니다.

페이지 별로 제공되는 기능이 공유됩니다.

```js
/*
파일 경로
/app/@team/page.js
/app/@analytics/page.js
*/
export default function layout(props) {
  return (
  <main>
    <section>{props.team}</section>
    <section>{props.analytics}</section>
  </main>
  )
}
```

## Intercepting routes

모달창을 띄울 때 모달창 고유의 URL주소가 필요하다면 폴더명 앞에 `(..)`를 붙여서 Interception routes를 사용할 수 있습니다.

모달창이 띄워진 상태로 새로고침한다면, 모달이 전체 페이지로 로드 됩니다.

# Server Component 

Next.js 13에서는 서버 컴포넌트가 추가되었습니다.
## Next.js 12의 SSR

`getServerSideProps`를 사용해서 SSR을 구현했습니다.

```js
export default function Next12page(){
  // The rest of logic
}
export async function getServerSideProps(){
  const response = await axios("https...")
  return { props : { items : response.data}}
}
```

기존의 방식은 몇 가지 문제가 있었습니다.

<br/>

**\* 페이지 최상단에서만 호출이 가능하다.**

페이지의 최상단에서만 호출이 가능했기 떄문에 **propsDrilling**의 문제가 있엇습니다.

`useContext`를 사용하거나 `redux`, `recoil`같은 상태 관리 라이브러리가 거의 필수적이였습니다.

<br/>

**\* 서버에서 모든 요청이 완료되기 전까지 화면에 아무것도 표시되지 않는다.**
  
서버에서 페이지를 랜더링 하기까지 모든 요청이 완료되어야 화면에 표시가 되었습니다.

만약 응답이 느린 API가 있다면 이미 요청이 완료된 API까지 기다려야하는 문제가 있었기때문에 SEO와 FCP중 하나를 선택해야 했습니다.

## Next.js 13의 SSR

Next.js 13에서는 이전 포스팅에서 다뤘던 [React Server Component(RSC)](https://web-log-wheat.vercel.app/log/sp9yRYM8mMbvjRHYWAUv)를 사용하기 때문에 **컴포넌트 단위로 서버에서 랜더링 할 수 있게 되면서** 12버전의 문제를 해결할 수 있게 되었습니다.

### Server Component

서버 컴포넌트를 사용하게되면 많은 이점이 있습니다.

이전 포스팅에서 다뤘던 [React Server Component(RSC)](https://web-log-wheat.vercel.app/log/sp9yRYM8mMbvjRHYWAUv)내용 과 중복되기 떄문에 짧게 설명하면

- waterfall이 감소됩니다.
- 클라이언트에서 사용하지 않는 라이브러리를 제거함으로 번들링 사이즈를 감소시킬 수 있습니다.
- 서버에서 code splitting을 할 수 있습니다.

### Client Component

만약 컴포넌트 안에서 상태 관리를 해야한다면 컴포넌트 최상단에 'use client'를 작성해서 클라이언트 컴포넌트로 opt-in 할 수 있습니다.

# Rendering

Next.js 13에서는 기본적으로 서버 컴포넌트를 사용하고, 서버 사이드에서 동작하며, 정적 페이지를 랜더링합니다. 

## Fetching

이미 설명했듯이 비동기 데이터를 다루는 것 또한 기본적으로 정적 페이지가 랜더링됩니다.

fetch를 사용해서 데이터를 가져올 경우 `cache : force-cache`가 default로 설정되어 있기 때문에 **기본적으로 캐싱**합니다.

### 캐싱되지 않는 경우 

**동적 메서드를 사용할 경우**
- next/header
  
**POST 요청**
- export const POST
- Authorization header
- cookie header

### 인자가 같은 경우 캐싱

외부 서비스를 사용할 경우 fetch의 캐싱 기능을 대체하기 위해 사용할 수 있습니다.

페이지가 랜더링 될 때 한 번만 호출하게 됩니다.

```js
import { cache } from 'react'

export const getPosts = cache(async (postId : string) => {
  const db = new FirebaseStroage()
  const post = db.getDoc('posts', postId)
  return post
})

export const getLogs = cahce(async () => {
  const db = new FirebaseStroage()
  const logs = db.getDocs('logs')
  return logs
})
```
> `fetch`와 `React.cache`하나만 사용하면 됩니다.

### revaildate (ISR)

데이터를 얼마동안 캐싱할지 `reavaildate` 옵션으로 데이터 유효성을 지정할 수 있습니다.

**revalidate을 지정하면 전체 사이트를 다시 빌드하지 않고** 특정 정적 경로만 업데이트 할 수 있습니다.

즉, ISR(Incremental Static Regeneration)이 됩니다.

Next.js 공식문서의 ISR 작동 원리를 나름 정리해봤습니다.

1. 빌드 타임에 랜더링 된 경로에 요청이 있으면, 데이터를 호출하고 캐시한 뒤 캐시된 데이터를 반환합니다.
2. 1번 이후 revalidate 시간 안에 요청이 오면 캐시된 데이터를 반환합니다.
3. revalidate 시간이 시나면 캐시된 데이터는 stale 캐시 데이터가 됩니다.
4. revalidate 시간이 지나고 요청이 오면 stale 캐시 데이터를 반환합니다.
5. Next.js는 백그라운드에서 데이터 재생성을 트리거합니다.
6. 성공적으로 경로가 생성되면 이전 캐시를 invalidate하고 업데이트된 데이터를 표시합니다.
7. 실패시 여전히 stale 캐시 데이터를 반환합니다.

### 동적으로 데이터 가져오기 (SSR)

기본적으로 서버 사이드에서 동작 되기 때문에 `getServerSideProps`를 사용할 필요가 없어졌습니다.

fetch로 가져온 데이터를 캐싱할 필요가 없다면 `cache : 'no-store'`, `revalidate : 0`를 설정하면 요청이 올 때 마다 새로운 데이터를 반환합니다.

### 클라이언트에서 서버 상태 관리 

아직까지 클라이언트에서 서버 상태 관리는 fetch보다 `react-query`나 `swr`을 사용할 것을 권장합니다.
### Server-Only (Poisoning)

서버에서만 동작할 것으로 예상되지만 클라이언트에서도 동작하는 경우가 있습니다.

```js
// service/api/logs.ts
export async function getlogs(){
  const response = await axios("https...", {
    headers : {
      key : Process.env.API_KEY
    }
  })
  return response.data
}
```
이렇게 작성하게 되면 환경 변수 또한 클라이언트로 노출 되기 때문에 서버에서면 동작되도록 `server-only` 패키지를 설치해야합니다.

`npm i server-only`

```js
// service/api/logs.ts
import 'server-only'

export async function getlogs(){
  const response = await axios("https...", {
    headers : {
      key : Process.env.API_KEY
    }
  })
  return response.data
}
```

## SSG 

Next.js 13 버전에서는  `generateStaticParams`를 사용해서 정적 페이지를 생성할 수 있습니다.

/app/\[page\]/page.tsx의 경우 아래와 같이 페이지를 정적으로 생성할 수 있습니다.

```js
export async function generateStaticParams() {
  const db = new FirebaseCollection()
  const logs = await getLogs(db, 'logs')
  const itemsPerPage = 5
  const pages = []
  for (let i = 0; i < Math.ceil(logs.length / itemsPerPage); i++) {
    pages.push(i + 1)
  }
  return pages.map((page) => ({ page }))
}
```
이외에도 `dynamicPramas`를 사용해서 생성되지 않는 정적 페이지에 대한 처리같은 것도 가능합니다.

추가적인 기능은 [Next.js SSG docs](https://nextjs.org/docs/app/api-reference/functions/generate-static-params)를 참고해주세요.

# Optimizing

## Font

nextjs 내부에서 폰트를 제공하기 떄문에 네트워크 요청이 제거되고 CSS [size-adjust](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/size-adjust)덕분에 layout-shift가 일어나지 않습니다.

local font도 사용할 수 있습니다.

```js
import { Azeret_Mono } from 'next/font/google'
import Header from '@/components/Header'
import './globals.css'

const AzeretMonoFont = Azeret_Mono({
  subsets: ['latin'],
  variable: '--font-azeret-mono',
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
```

## Metadata

(작성중...)
# 참고
[Next.js docs](https://nextjs.org/docs)를 참고해주세요.
