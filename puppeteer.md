# Puppeteer 사용 방법 알아보기

Puppeteer란 [DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/)을 사용해서 **Chrome/Chromium을 제어하기 위한 API를 제공해주는 Node.js 라이브러리**이다.

브라우저에서 수동으로 수행해야하는 대부분의 동작을, Puppeteer를 사용해서 자동화할 수 있다.

SPA에서도 Crawling이 가능하기 때문에 SPA를 SSR하거나 UI, extention 테스트 환경 구축 등 다양한 방면으로 사용할 수 있다.

> Chrome/Chromium의 차이점이 궁금하면 아래 기사를 참고하자
> https://www.howtogeek.com/202825/what%E2%80%99s-the-difference-between-chromium-and-chrome/

## 환경 설정

### .puppeteerrc.cjs

.puppeteerrc.cjs 파일로 Puppeteer의 동작을 구성하는 옵션을 정의할 수 있다.

```js
// .puppeteerrc.cjs
module.exports = {
  // Changes the cache location for Puppeteer.
  cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
};
```
[puppeteerrc configuration 참고 링크](https://pptr.dev/guides/configuration)

[puppeteerrc properties 참고 링크](https://pptr.dev/api/puppeteer.configuration)


### Environment variables

`HTTP_PROXY`, `HTTPS_PROXY`, `NO_PROXY` 환경 변수로 프록시를 설정할 수 있다.


### temp file

Puppeteer는 temp 서버에 쌓이는데 이 부분을 방치하면 서버 메모리가 부족해질 수 있다.

product 환경에서 Puppeteer를 사용할 때 temp 파일을 어떻게 처리할 것인지 고민해야 한다.

[puppeteer consuming too much disk space with temporary files](https://stackoverflow.com/questions/68674577/puppeteer-consuming-too-much-disk-space-with-temporary-files)

[Cleanup temp puppeteer files before or after run](https://github.com/jef/streetmerchant/issues/378)

## puppeteer 실행하기

`npm i puppeteer`로 Puppeteer를 설치 후 Node.js 환경에서 실행한다.

```js
import puppeteer from 'puppeteer'

export default function init() {
    // 브라우저 생성
    const browser = await puppeteer.launch({
        headless: false, // true 시 Chromium이 백그라운드에서 동작
        args: ['--disable-notifications'], // 알림창 끄기
        devtools: false, // devtolls 끄기
    })

    // 새로운 페이지 생성
    const page = await browser.newPage() 
    
    // 페이지 이동
    // https://pptr.dev/api/puppeteer.page.reload/#remarks
    await page.goto("https://...com", 
        { waitUntil: 'networkidle0' } // 500ms 동안 네트워크 연결이 0개 이하이면 탐색이 완료된 것으로 간주 
    ) 
    await page.setViewport({width: 1080, height: 1024});  // 스크린 사이즈 설정

    await page.setUserAgent("write a user agent") // user Agent 설정 
    await page.setExtraHTTPHeaders({ referers: "write a referer" }) // referer 설정
}
```

번들 버전의 Chrome을 사용하고 싶다면 두 가지 방법이 있다.

1. `npm i puppeteer-core`로 설치 후 실행

2. executablePath 옵션을 사용해서 번들 버전 실행
```js
const browser = await puppeteer.launch({executablePath: '/path/to/Chrome'});
```

[cross browser suppert도 확인해보자.](https://pptr.dev/faq#q-what-is-the-status-of-cross-browser-support)

## DOM에서 정보 가져오기

`page.evalueate`를 사용해서 DOM에서 정보를 가져올 수 있다.

```js
const productData = await page.evaluate(() => {
    const title = document.querySelector('h1').innerText
    const price = document.querySelector('.price').innerText
    const description = document.querySelector('.description').innerText
    return { title, price, description }
}, [])
```

`page.evaluate`는 브라우저(Chromium)의 컨텍스트에서 실행되기 때문에 DOM에 접근할 수 있다.

`page.evaluate`의 컨텍스트로 변수를 전달하기 위해서는 아래와 같이 작성해야 한다.

```js
const id = "foo"

const fooData = await page.evaluate((id) => {
    const title = document.querySelector(`#${id} .title`).innerText
    const description = document.querySelector(`#${id} .description`).innerText
    return { title, description }
}, [id])
```

`page.evaluate`의 컨텍스트 안에서 실행한 `console.log`를 Node.js환경에서 출력하기 위해서는 추가적인 설정이 필요하다.

```js
// https://stackoverflow.com/questions/46198527/puppeteer-log-inside-page-evaluate
page.on('console', async (msg) => {
  const msgArgs = msg.args();
  for (let i = 0; i < msgArgs.length; ++i) {
    console.log(await msgArgs[i].jsonValue());
  }
});
```

마우스의 움직임을 비주얼로 확인하고 싶다면 아래 코드를 참고하자

<details>
<summary>mouse helper</summary>

```js
// This injects a box into the page that moves with the mouse;
// Useful for debugging
async function installMouseHelper(page) {
  await page.evaluateOnNewDocument(() => {
    // Install mouse helper only for top-level frame.
    if (window !== window.parent) return;
    window.addEventListener(
      "DOMContentLoaded",
      () => {
        const box = document.createElement("puppeteer-mouse-pointer");
        const styleElement = document.createElement("style");
        styleElement.innerHTML = `
        puppeteer-mouse-pointer {
          pointer-events: none;
          position: absolute;
          top: 0;
          z-index: 10000;
          left: 0;
          width: 20px;
          height: 20px;
          background: rgba(0,0,0,.4);
          border: 1px solid white;
          border-radius: 10px;
          margin: -10px 0 0 -10px;
          padding: 0;
          transition: background .2s, border-radius .2s, border-color .2s;
        }
        puppeteer-mouse-pointer.button-1 {
          transition: none;
          background: rgba(0,0,0,0.9);
        }
        puppeteer-mouse-pointer.button-2 {
          transition: none;
          border-color: rgba(0,0,255,0.9);
        }
        puppeteer-mouse-pointer.button-3 {
          transition: none;
          border-radius: 4px;
        }
        puppeteer-mouse-pointer.button-4 {
          transition: none;
          border-color: rgba(255,0,0,0.9);
        }
        puppeteer-mouse-pointer.button-5 {
          transition: none;
          border-color: rgba(0,255,0,0.9);
        }
      `;
        document.head.appendChild(styleElement);
        document.body.appendChild(box);
        document.addEventListener(
          "mousemove",
          (event) => {
            box.style.left = event.pageX + "px";
            box.style.top = event.pageY + "px";
            updateButtons(event.buttons);
          },
          true
        );
        document.addEventListener(
          "mousedown",
          (event) => {
            updateButtons(event.buttons);
            box.classList.add("button-" + event.which);
          },
          true
        );
        document.addEventListener(
          "mouseup",
          (event) => {
            updateButtons(event.buttons);
            box.classList.remove("button-" + event.which);
          },
          true
        );
        function updateButtons(buttons) {
          for (let i = 0; i < 5; i++) box.classList.toggle("button-" + i, buttons & (1 << i));
        }
      },
      false
    );
  });
}

module.exports = { installMouseHelper };
```
```js
const { installMouseHelper } = require("./install-mouse-helper");
await installMouseHelper(page);
```
</details>


## Screenshot

서버에서 puppeteer를 만들 경우 비주얼로 확인할 수 없기 때문에 capture를 사용해서 진행 상황을 확인한다.

[에러가 발생했을 때 유용하다.](https://github.com/puppeteer/puppeteer/issues/1890)

[puppeteer screenshot options을 참고하자](https://pptr.dev/api/puppeteer.page.screenshot/)

```js
await page.screenshot({
   path: 'screenshopt.png', fullPage: true
})
```

## Extension 추가하기

Chromium을 실행할 때 확장 프로그램을 추가할 수 있다.

[Chrome Extensions](https://pptr.dev/guides/chrome-extensions)

```js
const extention1 = 'C:\\Users\\vasilis\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\\aabbccdd';
const extention2 = 'C:\\Users\\vasilis\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\\eeffgghhh';

const browser = await puppeteer.launch({
  headless: false,
  args: [
    `--disable-extensions-except=${extention1},${extention2}`, 
    `--load-extension=${extention1},${extention2}`,
    '--enable-automation'
  ]
})
```


