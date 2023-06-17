## 기존 SSR의 문제점과 React 18에서의 개선 방법

### 기존 SSR의 문제점
1. **모든 data fetch가 끝나야 어떤 것이라도 보여줄 수 있다.**

2. **모든 자바스크립트를 로드하기 전까지 hydration을 진행할 수 없다.**

3. **앱이 상호작용할 수 있는 상태가 되려면 앱 전체의 hydration이 끝나야 한다.**

기존 SSR은 각 단계가 끝나야 다음 단계로 넘어갈 수 있었습니다.

```
<Render Cyecle>
1. 서버에서 데이터를 패치합니다. (DB접근, API Response 등을 기다립니다.)
2. 서버에서 클라이언트로 전송할 HTML파일을 랜더합니다.
3. 클라이언트에서 HTML파일을 받고, JavaScript파일을 로드합니다.
4. 클라이언트에서 Hydration이 되면 Interaction이 가능한 화면이 표시됩니다.
```
React 18에서는 위와 같은 SSR의 사이클을 컴포넌트 단위로 나누어서 기존 SSR의 문제를 해결하고자 했습니다.
```
<Home/>   -> <Render Cycle>
<Search/> -> <Render Cycle>
<Items /> -> <Render Cycle>
```
## Suspense

React 18 부터 `Suspense`를 사용하면 **서버에서의 작업이 끝난 컴포넌트만 selective hydration이 되도록 변경**되도록 함으로 기존 SSR의 문제를 해결했습니다.

```js
import {lazy} from "react" // nextjs는 dynamic

const Comments = lazy(() => import(".Comments.jsx"));

return (
  <Suspense fallback={<Spinner/>}>
    <Comments>
  </Sumspens>
)
```
근데 조금 의아합니다.

Selective hydration이 되게 하려면 서버에서 데이터를 패치가 끝날 때마다 클라이언트로 패칭된 데이터를 보내주는 걸까요?

기존 클라이언트에서 동작하는 Suspense는 어떻게 되는 걸까요?

### Streaming SSR (renderToPipeableStream)

React 팀은 streaming SSR이라는 기술을 통해서 서버와 클라이언트가 streaming 할 수 있는 기능을 제공하고 있습니다.

Streaming하기 있기 때문에 Selective hydration이 가능하게 됩니다. 

`renderToPipeableStream`를 사용하면 Streaming SSR을 사용할 수 있습니다.

이를 구현 하려면 서버가 필요한데요.

react는 서버를 제공해 주지 않기 때문에 express로 만든 서버에서 Streaming SSR을 사용하고 있다고 가정하고 `render` 함수를 구현해 보겠습니다.

```js
export default async function render(url, req, res) {
  res.socket.on('error', (error) => {
    console.error('soket연결에 실패했습니다.\n', error)
  })
  let didError = false

  // react 18의 suspense를 사용해 보기 위해 인위적으로 1.5초의 딜레이를 줍니다.
  const delay = createDelay(1500)
  const ctx = {
    delay,
    data: '',
  }
  // JS 객체를 반환하는 API라고 예를 들겠습니다.
  ctx.data = await fetchData("https:...")

  // react 18에서 제공하는 renderToPipeableStream 기능을 사용해야 SSR이 동작합니다.
  const stream = renderToPipeableStream(
    <Provider data={ctx}>
        <html lang="en">
          <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="stylesheet" href={assets['main.css']} />
            <link rel="icon" type="image/png" href="/favicon.png" />
            <title>"React 18 예시"</title>
          </head>
          <body>
            <noscript
              dangerouslySetInnerHTML={{
                __html: `<b>Enable JavaScript to run this app.</b>`,
              }}
            />
          </body>
          <div id="root">
            <StaticRouter location={url}>
              <App assets={assets} />
            </StaticRouter>
          </div>
          // Nextjs 12 버전을 사용해 보셨다면 페이지소스에 props객체가 들어가 있는 것을 생각하시면 됩니다.
          {ctx.data && (
            <script id="__SERVER_DATA__" type="application/json">
              {ctx.data}
            </script>
          )}
          <script
            dangerouslySetInnerHTML={{
              __html: `assetManifest = ${JSON.stringify(assets)};`,
            }}
          />
        </html>
    </Provider>,
    {
      // SSR시 bootstrapScripts를 지정해줘야 서버에서 js파일을 먼저 로드합니다.
      bootstrapScripts: [assets['main.js']],
      onShellReady() {
        // Streaming이 시작 되기전 에러가 발생한다면 이 곳에서 error code를 접근합니다.
        res.statusCode = didError ? 500 : 200
        res.setHeader('Content-type', 'text/html;charset=UTF-8')
        stream.pipe(res)
      },
      onError(x) {
        didError = true
        console.error(x)
      },
    },
  )
  // 충분한 시간이(현제 10초) 지나면 SSR을 포기하고 CSR으로 전환합니다.
  setTimeout(() => stream.abort(), 10000)
}
```
> Express로 만든 서버는 CJS환경에서 실행되는데 react를 import하기 위해 저는 서버를 번들링하는 방식을 선택했습니다. [CJS, ESM 대응 라이브러리 개발](https://toss.tech/article/commonjs-esm-exports-field) 아티클도 참고해볼만 합니다.

### React Server Component(RSC)

컴포넌트마다 SSR을 구현하려면 위 예시만으로는 부족합니다.

기존 클라이언트에서 동작하는 Suspense와 서버에서 사용하는 Suspense를 구분해줘야하기 때문이죠.

그래서 나온 것이 **React Server Component**(이하 RSC) 입니다.

바로, 이 기능이 전통적인 SSR과 다른 차별점을 만들어 줍니다.

react에서는 파일 이름 뒤에 `*.server.jsx` 라는 키워드를 추가하면 서버에서 동작하는 컴포넌트가 됩니다.

추가로 nextjs 13 버전에서는 기본적으로 서버 컴포넌트로 동작하고 프로젝트 최상단에 'use client'키워드를 붙여주면 클라이언트 컴포넌트로 동작합니다.

아직 RSC를 직접 구현해 보진 못했지만, NextJS의 13버전에서 RSC기능이 추가 되었기 때문에 사용해 볼 수 있습니다.

이 블로그도 NextJS 13버전으로 만들었습니다.

#### Susponese, Streaming SSR, RSC의 장점

이 기능들을 통해서 기존 SSR의 문제를 해결할 뿐만 아니라 다음과 같은 장점도 얻게 됩니다.

1. Client server waterfall 현상

부모, 자식 컴포넌트간 래렌더링이 여러번 호출되어 latency가 들어나는 현상을 RSC를 사용하면 어느정도 해소할 수 있게 됩니다.

2. Zero bundle size component
   
서버에서 동작하는 컴포넌트는 서버 자원을 활용할 수 있기 때문에 클라이언트에서 사용할 수 없는 무거운 라이브러리를 사용해도 최동 번들 사이즈에 영향을 주지 않습니다.

기존 백엔드에서 했던 무거운 작업을 NextJS안에서 모두 해결할 수 있게 되었습니다.

3. Code splitting

서버에서 컴포넌트가 동작되기 때문에 클라이언트에서 사용하지 않는 컴포넌트를 동적으로 정할 수 있습니다.

RSC에 대해서 더 알아보고 싶으시다면 아래 아티클을 추천합니다.

[React 18: 리액트 서버 컴포넌트 준비하기](https://tech.kakaopay.com/post/react-server-components/#%EB%A6%AC%EC%95%A1%ED%8A%B8-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EC%9D%98-data-fetching)

[New Suspense SSR Architecture in React 18](https://github.com/reactwg/react-18/discussions/37)


<br> 

> 이외에도 다양한 기능이 추가되었습니다.

## Automatic Batching

예전에도 일부 적용되었으나 api 콜백 함수나, timeout 함수에선 동작하지 않았습니다.

이 부분이 이젠 개선되었다고 합니다.

```js
// react 18 이전
function handleClick(){ 
  // 리렌더링 1번
  setCount((prev) => prev+1)
  setFlag((prev) => !prev)
}

fetch("url").then((res) => {
  // 예전에는 리렌더링 2번
  setCount((prev) => prev+1)
  setFlag((prev) => !prev) 
})
```
batch 처리를 직접 막을 수도 있습니다.

```js
import { flushSync } from "react-dom"

flushSync(() => setCount((prev) => prev+1)) // 리랜더링 1번
flushSync(() => setFlag((prev) => !prev)) // 리랜더링 2번
```
<br> 

## useTransition

UI개선, 업데이트의 우선순위를 정할 수 있습니다.

```js
const { useTransition, startTransition } from "react"

const [isPending, startTransition] = useTransition();
  // 천천히 업데이트됩니다.
  setInputValue(input) 

  // 더 빠르게 업데이트됩니다.
  startTransition(() => {
    setSearchQuery(input) 	
  })
return <>{isPending && <Spinner/>}</>
```
<br>

# 참고

[New Suspense SSR Architecture in React 18](https://github.com/reactwg/react-18/discussions/37)

[React Suspense Document](https://react.dev/reference/react/Suspense)

[How to Enable Server-Side Rendering for a React App](https://www.digitalocean.com/community/tutorials/react-server-side-rendering)

[react-app-ssr, react 18 이전 SSR 구현한 방식](https://github.com/Octanium91/react-app-ssr)

[React Suspense 알아보기](https://velog.io/@xiniha/React-Suspense-%EC%95%8C%EC%95%84%EB%B3%B4%EA%B8%B0)

[React 18: 리액트 서버 컴포넌트 준비하기](https://tech.kakaopay.com/post/react-server-components/#%EB%A6%AC%EC%95%A1%ED%8A%B8-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EC%9D%98-data-fetching)

[CJS, ESM 대응 라이브러리 개발](https://toss.tech/article/commonjs-esm-exports-field) 