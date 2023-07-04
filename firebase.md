# Next.js 13으로 블로그를 만들면서 겪은 문제와 해결 방안

블로그에 사용된 기술은 다음과 같다.

- Next.js 13.4.2 (app directory)
- TypeScript  5.0.4
- firebase cloud storage
- firebase cloud firestore
- vercel

# tl;dr

1. `React.cache`는 `server-only`와 preload pattern을 사용하자.

2. `React.cache`는 아직 Production 환경에서 사용하기엔 부족한 부분이 있다.

3. SDK, 파일 시스템 등 서버 사이드 작업을 캐싱하려면 `fetch`를 사용하자

4. 배포환경을 고려하는 것을 잊지 말자

##  Firebase SDK

이 블로그는 firebase를 사용하고 있기 때문에 firebase에서 제공하는 SDK를 사용해서 구현했다.

아래와 같이 cloud firestore에서 데이터를 가져오는 함수를 만들었다.

```js
// service/firebase/index.ts

const firebaseInitConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGE_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
}

export function getFirebaseDocs(collectionName : string) {
  const db = getFirestore(firebaseInitConfig)
  const snapshot = await getDocs(collection(db, collectionName))
  const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  return docs
}
```

이제 firebase의 SDK를 캐싱하는 과정에서 있었던 일을 정리해 보겠다.

## Next.js의 Caching

Next.js는 서버에서 데이터를 캐싱할 방법을 두 가지 제공하고 있다.

1. `React.cache`
2. `fetch`

사용 방법은 이전 포스팅에서 다루었기 때문에 생략한다.

### React.cache 

위 코드를 보면 SDK를 사용하고 있기 때문에 fetch를 사용해서 캐싱하려면 로직이 복잡해진다.

파일 시스템이나 SDK같이 `fetch`를 사용해서 캐싱하기 힘든 경우 `React.cache`를 사용하면 된다.

```js
// service/firebase/index.ts

export const getFirebaseDocsCache = cache(async (collectionName: string) => {
  const snapshot = await getDocs(collection(db, collectionName))
  const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  return docs
})
```

### server-only

만약 이대로 `getFirebaseDocsCache`를 서버 컴포넌트 호출하면 API_KEY가 그대로 클라이언트로 노출될 수 있고 서버, 클라이언트(hydration 이후) 두 번의 API 요청이 발생하게 된다.

겉으로 보기에는 큰 문제가 없어 보이기 때문에 차후 큰 문제가 생길 수 있다.

이를 방지하기 위해 해당 파일이 서버에서 동작하는 파일임을 명시해 주려면 `npm i server-only` 설치 후 서버에서 동작하는 파일 최상단에 `import "server-only"`를 선언하면 된다.

```js
// service/firebase/index.ts
import "server-only"

export const getFirebaseDocsCache = cache(async (collectionName: string) => {
  const snapshot = await getDocs(collection(db, collectionName))
  const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  return docs
})
```

서버 컴포넌트에서 `getFirebaseDocsCache`를 호출한다.

```js
// app/layout.tsx
import { getFirebaseDocsCache } from "service/firebase"

export default async function Layout({children}) {
  const fooMenu = await getFirebaseDocsCache("foo")
  return (
    <div>
        <Header menu=fooMenu ></Header>
        {children}
    </div>
  )
}
```

`getFirebaseDocsCache("foo")`는 캐싱되기 때문에 다른 서버 컴포넌트에서 `getFirebaseDocsCache("foo")`를 호출해도 요청이 발생하지 않는다.

### preload pattern

preload pattern을 사용해서 API 요청 시간을 줄일 수 있고 레이아웃에서 캐시를 관리할 수 있다.

```js
// util/preload.ts
import 'server-only'
import { getFirebaseDocsCache } from '@/service/firebase/index.ts'

type CollectionName = 'menu' | 'tags' | 'posts' | 'users' | 'comments'

export const getDocsPreload = (...collections: CollectionName[]) => {
  void collections.forEach((name) => {
    getFirebaseDocsCache(name)
  })
}
```

firebase API를 호출하는 레이아웃에서 아래와 같이 작성한다.
```js
// app/layout.tsx
import { getDocsPreload } from "@/util/preload.ts"

export default async function Layout({children}) {
  getDocsPreload('menu', 'tags', 'users') 

  const menu = await getFirebaseDocsCache("menu")
  return (
    <div>
        <Header menu=menu ></Header>
        {children}
    </div>
  )
}
```

### React.cache의 문제점

아직 Next.js가 베타 버전인 만큼 `React.cache`를 사용하면서 여러 문제를 겪었다.

- Tree missmatch로 인한 waterfall
- Link prepatch와 API 중복 요청
- Dynamic generations

#### Tree missmatch로 인한 waterfall

네트워크가 느려서 hydration이 진행 중인 클라이언트 컴포넌트가 서버와의 상태가 miss match일 경우

페이지 자체 retry 요청을 반복한다. network를 slow 3G로 설정하면 환상적인 폭포를 감상할 수 있다.

![dev tool waterfall](https://peacepiece7.github.io/blog-static-assets/nextjs-blog-problems/waterfall_devtool.PNG 'large')

네트워크 속도가 느릴 경우 데이터를 stale로 판단하거나, 주소가 이동되었다고 판단하는 경우가 있는데 꼭 slow 3G로 설정하지 않아도 이런 현상이 일어난다.
![dev tool missmatch](https://peacepiece7.github.io/blog-static-assets/nextjs-blog-problems/devtool_mismatch.PNG 'large')

### Link prepatch와 API 중복 요청

`React.cache`를 사용해도 **새로운 페이지가 렌더링 될 때 반드시 한 번 호출이 일어난다.**

이 부분은 그럴 수 있는데 prepatch와 tree missmatch까지 겹치면 엄청난 중복 요청이 발생한다.

layout에서 firebase SDK를 호출하고 캐싱하고 있다고 가정하자.

그리고 클라이언트 컴포넌트를 만든다.

```jsx
'use client'
import Link from "next/link"
import { useRouter } from "next/router"
export default function LatestPosts({posts}) {
    const router = useRouter()
    function handleBadButton() {
        router.push("/bar")
    }
    return (
        <div>
          <h1>Latest Posts</h1>
            {posts.map((post) => {
              return (
                {/* prefetch는 default가 true이다. */}
                <Link key={post.id} href="/foo">{post.title}</Link>
              )
            })}
            <button onClick={handleBadButton}/>
        </div>
    )
}
```

위 코드에서 `handleBadButton`을 클릭하기 위해 마우스가 Link 컴포넌트들 위를 쓱 지나간다면

`getFirebaseDocsCache`가 몇 번 호출되는지 로깅 해보자.

![log](https://peacepiece7.github.io/blog-static-assets/nextjs-blog-problems/waterfall_terminal.PNG)

극단적인 연출이지만 이런 현상 자체는 빈번히 일어난다.

### Dynamic generations

nextjs 13에서는 `generdateStaticParams`를 사용해서 SSG를 할 수 있고 `generateMetaData`로 메타데이터를 동적 생성 할 수 있다.

preload 챕터에서 preload pattern을 사용해 레이아웃에서 캐싱을 관리하고 있기 때문에 아래 코드는 **캐싱 된 데이터를 호출해야 할 것 같지만 실제로는 API를 한 번 더 호출한다.**

```js
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const logs = await getFirebaseDocsCache('logs', params.id)
  const log = logs.find((log) => log === params.id)
  return {
    title: `Web log | ${log.title}`,
    description: `${log.title} 포스팅`,
    keywords: `${log.tags.join(', ')}`,
  }
}

export async function generateStaticParams() {
  const logs = await getFirebaseDocsCache('logs')
  return logs.map((log) => ({ id: log.id }))
}
```

이러한 문제를 모르고 개발하던 당시 MAU가 0인 블로그를 혼자 개발하면서 일 6.6만 개의 API 요청이 발생하는 경험을 했다.

### 해결책과 또 다른 문제

이러한 문제를 해결하기 위해 여러 방법을 시도했고 최종적으로 두 가지 방법이 유효했다.

- firebase REST API 문서를 참고해서 fetch로 요청을 보낸다.
  
- 프론트 서버에 API를 만들고 API 내부에서 fireabse SDK 요청을 보낸다.

첫 번째는 방법은 문제의 근본적인 해결책이 아니기 때문에 두 번째 방법으로 release했다.

```js
// /app/api/get/getlogs/route.ts
import { NextResponse } from 'next/server'
import { getDocsCache } from '@/service/Firebase_fn/collection'

export async function GET() {
  try {
    const menu = await getDocsCache('menu')
    return NextResponse.json( menu )
  } catch (error) {
    console.error(error)
    return { menu : []}
  }
}
```

하지만 이것도 vercel에 배포할 경우 문제가 있었는데 

vercel에서 127.0.0.1을 호출할 수 없고 빌드 시 해당 도메인 서버를 사용할 수 없는 문제가 있었다.

이를 해결하기 위해 `fetcher` 함수를 만들어서 배포, 개발 환경에서 다른 방식으로 API를 호출하도록 했다.

```js
import 'server-only'
import { getFirebaseDocsCache } from '@/service/firebase/index.ts'

type CollectionName = 'menu' | 'tags' | 'posts' | 'users' | 'comments'

export const getFetcher = async (...collections: CollectionName[]) => {
  if (process.env.NODE_ENV === 'development') {
    const apis = collections.map((collection) => {
      return fetch(`http://localhost:3000/api/get/${collection}`)
    })
    const responses = await Promise.all(apis)
    return Promise.all(responses.map((res) => res.json()))
  }

  const apis = collections.map((collection) => {
    return getDocsCache(collection)
  })
  return Promise.all(apis)
}
```

## TMI

아직 반도 못 적었는데 내용이 너무 길어졌다..

블로그를 SSG로 제작했기 때문에 production 환경일 경우 firebase SDK를 바로 호출하고 있지만 실제서비스를 계획하고 있다면 서버를 직접 구현하는 것이 좋을 것 같다.