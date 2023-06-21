# NextJS 13


NextJS 13버전은 12버전과 다른 프레임워크라고 할 정도로 많은 부분이 변경되었습니다.



모든 내용을 다룰 수 없기 때문에 기능 위주로 알아보겠습니다.

13.4.3을 기준으로 작성했으며 개발 속도가 워낙 빠르다보니 변경된 내용이 있을 수 있습니다.

[nextjs 공식문서](https://nextjs.org/docs)를 참고해주세요.

# Routing

라우팅 경로가 `pages`에서 `app`으로 변경되었습니다.

각 경로마다 컴포넌트를 아래와 같이 나눌 수 있습니다.

- **layout.js** (layout)
- **template.js**
- **error.js** (React error boundary)
- **loading.js** (React suspense boundary)
- **not-found.js** (React error boundary)
- **page.js** (page)

[nextjs routing docs](https://nextjs.org/docs/app/building-your-application/routing)를 참고해주세요

# rendering

NextJS는 기본적으로 정적 렌더링을 합니다.


## Fetching

fetch를 사용해서 데이터를 가져올 경우 **기본적으로 캐싱**합니다.

즉, `cache : force-cache` 입니다.

### 캐싱되지 않는 경우 

1. 동적 메서드를 사용할 경우
  - next/header
2. POST 요청
  - export const POST
  - Authorization header
  - cookie header

### 인자가 같은 경우 캐싱

외부 서비스를 사용할 경우 필요할 수 있습니다.

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

### Revaildate

데이터를 얼마동안 캐싱할지 `reavaildate` 옵션으로 데이터 유효성을 지정할 수 있습니다.

revalidate을 지정하면 ISR(Incremental Static Regeneration)이 됩니다.

[공식 문서를 확인해주세요.](https://nextjs.org/docs/app/building-your-application/data-fetching/revalidating)

### 동적으로 데이터 가져오기

fetch로 가져온 데이터를 캐싱할 필요가 없다면
`cache : 'no-store'`, `revalidate : 0`를 설정하면 됩니다.



# Optimizing




