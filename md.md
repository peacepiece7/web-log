# DOM

Document Object Model은 HTML 문서를 조작할 수 있는 Interface를 말합니다.

구조화된 문서의 표현을 제공하고, 웹 페이지를 프로그래밍 언어에서 사용될 수 있도록 연결해 주는 역할을 하고 있습니다.

[watwg.org](https://dom.spec.whatwg.org/)에서 DOM을 구현하는 기준을 정의하고 있습니다.

[mdn](https://developer.mozilla.org/ko/docs/Web/API/Document_Object_Model/Introduction)은 상업적으로 활용할 수 있는 DOM의 사용법을 대부분 정리하고 있습니다.

# Node vs Element

[Node](https://developer.mozilla.org/ko/docs/Web/API/Node) : 텍스트, 주석 등 모든 HTML 요소를 의미합니다.

[Element](https://developer.mozilla.org/ko/docs/Web/API/Element) : HTML 요소를 의미합니다.

# 메서드 알아보기

## 검색과 탐색 

요소를 찾지 못하면 `null`을 반환합니다.

유사 배열(Array-like object)입니다.

### 선택자

**selector**와 일치하는 요소를 반환합니다.

```js
document.querySelector(selector) // Element
document.querySelectorAll(selector) // NodeList

// live한 요소를 반환한다는 점 외에는 querySelector와 같습니다.
document.getElementById(selector) // Element
document.getElementsByTagName(name) // HTMLCollection

```
요소를 탐색합니다.

```js
// 노드의 부모 요소 반환합니다.
node.parentElement

// 자신을 포함한 가장 가까운 요소 반환합니다.
element.closest(selector)
- selector : string = scss selector, tag name, id ... 

// 형제 노드를 반환합니다.
node.previousSibling
node.nextSibling

// 형제 엘리먼트를 반환합니다. (HTML) Element)
node.previousElementSibling
node.nextElementSibling

// 루트 노드를 반환합니다.
node.getRootNode() // HTMLDocument | ShadowRoot
```

### Element CRUD 메서드

#### `insertAdjacentElement(position, target)`

상대 위치로 요소 삽입합니다.

position : string
- "beforebegin" (target 앞)
- "afterbegin" (target 첫 번째 자식 앞)
- beforeend (target 마지막 자식 뒤)
- afterend (target 뒤)

return : HTMLElement

```js
element.insertAdjacentElement(position, target)
```
```html
<!-- beforebegin -->
<p>
  <!-- afterbegin -->
  foo
  <!-- beforeend -->
</p>
<!-- afterend -->
```

#### `insertAdjacentHTML(position, text)`

 상대 위치로 HTML text를 삽입합니다.

 <br/>

#### `insertAdjacentText(position, text)`

상대 위치로 text 노드를 삽입합니다.

insertAdjacentElement과 유사합니다.

```js
element.insertAdjacentHTML(position, text)
element.insertAdjacentText(position, text)
```
 <br/>

#### `node.insertBefore(newNode, refNode)`

node 안 refNode 앞에 newNode 요소를 삽입합니다.
```js
const node = document.querySelector(".title")
const refNode = document.querySelector(".description") 
const newNode = document.createElement("h1")
newNode.textContent = "new title"

node.inserBefore(newNode, refNode)
// node : Node
// refNode : Node | null
```

 <br/>

#### `node.cloneNode(deep)`

노드를 복사합니다.

deep : boolean
- true일 경우 text까지 하위 노드 복사
- false일 경우 해당 노드만 복제 (textNode 복제 x)

 <br/>

#### `element.append(...nodes)`

자식 노드를 마지막 자식으로 추가합니다. (appendChild보다 유연합니다.)

nodes : string | Node

<br/>

#### `element.appendChild(aChild)`

자식 노드를 마지막 자식으로 추가합니다. (type이 제한적인 장점이 있습니다.)

aChild : Node

 <br/>

#### `element.prepend(node)`

첫 번째 자식 집합을 삽입합니다. 문자열은 동등한 노드로 삽입됩니다.

```js
element.append("bar")
element.prepend("foo is ")
console.log(element.textContent) // foo is bar
```

#### `element.after(...nodes)`

다음 요소에 노드를 넣습니다.

nodes : string | Node

1. append
```js
element.append(span,"TEXT")
```
```html
<div>
  <span></span>
  TEXT  
</div>
```
2. after
```js
element.after(span,"TEXT")
```
```html
<div></div>
<span></span>
TEXT
```
<br/>

#### `element.remove()`

자신을 제거합니다.

<br/>

#### `node.removeChild(childNode)`

자식 노드를 제거합니다.

childNode : Nod

<br/>

#### `parentNode.replaceChild(node, targetNode)`

자식노드를 교체합니다.

node와 targetNode를 교체합니다.

만약 DOM의 다른 다른 부모 노드에 있는 targetNode를 node와 교체하려고 하면, targetNode는 제거됩니다.

node : Node

targetNode : Node

<br/>

#### `parentNode.replaceChildren(...nodes)`

모든 자식 노드를 교체합니다.

nodes : Node[]

nodes 인자가 주어지지 않는다면 모든 children이 제거됩니다.

<br/>

#### `node.replaceWith(...params)`

노드를 교체합니다.

params : Node[] | string

replaceChild보다 유연합니다.

<br/>

### 노드를 비교, 확인
```js
/**
 * node와 otherNode를 비교합니다.
 * @propery {Node} otherNode
 * @return {boolean}
 */
node.contains(otherNode)

/**
 * 요소와 selector를 비교합니다.
 * @propery {string} selector (css selector)
 * @return {boolean}
 */
 */
element.natches(selector)

/**
 * 노드가 동등한지 비교합니다.
 * id, 자식, 속성 등이 일치하면 동일합니다. 
 * @propery {Node} otherNode
 * @return {boolean}
 */
node.isEqualNode(otherNode)

/**
 * 노드가 같은지 비교합니다.
 * node === otherNode일 경우민 true를 반환합니다.
 * @propery {Node} otherNode
 * @return {boolean}
 */
node.isSameNode(otherNode)
```
<br/>

#### `node.compareDocumentPosition(tagetNode)`

node의 상대적인 위치를 비스마스킹으로 반환합니다.


tegetNode : HTMLElement

return : number

```text
1 : 동일한 문서에 속하지 않음
2 : node는 targetNode 뒤에 위치
4 : node는 targetNode 앞에 위치
8 : node는 targetNode의 자식 노드
16 : node는 targetNode의 부모 노드
0 : node와 targetNode가 동일
```

여러 가지 경우가 일치할 경우 비트를 더해서 반환합니다.

예시입니다.
```js
div1.compareDocumentPosition(divf1) // 0 (div1은 divf1과 같은 요소)
footer.compareDocumentPosition(main) // 2 (footer는 main 뒤에 위치)
main.compareDocumentPosition(footer) // 4 (main은 footer 앞에 위치)
li.compareDocumentPosition(ul) // 10 (li는 ul의 자식)
ul.compareDocumentPosition(li) // 20 (ul은 li의 부모)
```
<br/>

### 노드의 정보, 속성

```js
// 노드의 이름을 반환합니다.
node.nodeType

// 노드의 값을 반환합니다.
node.nodeValue

// 노드의 타입을 반환합니다.
//  https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType 를 참고해주세요.
//  return : 1<ElementNode> | 2<AttributeNode> | 3<TextNode> ....
node.nodeType

// 요소의 이름을 반환합니다.
node.tagName

// e.g
 // 이 #text 즉 text node라고 가정하겠습니다.
const textNode = document.querySelector("p").childNodes[0]

textNode.nodeName // "#text"
textNode.nodeType // 3
textNode.tagName // undefined
```
<br/>

### shadowRoot

shadow dom을 연결, 참조를 반환합니다.

내용이 많다 보니 [mdn](https://developer.mozilla.org/ko/docs/Web/Web_Components/Using_shadow_DOM)을 참고해 주세요.

```js
element.attachShadow({ mode: "open" });
```
<br/>

### TextNode

#### `node.nomalize()`

Node와 모든 하위 트리를 정규화된 형식으로 만듭니다. 

텍스트 노드는 비어있지 않고, 인없한 텍스트 노드도 없습니다.

PDF를 HTML로 변환하는 작업을 한 적이 있는데 그때 이 메서드를 알았더라면 최적화에 유용하게 사용했을 것 같습니다.

before
```html
<output id="result">
	Before normalization:<br> 
	#text: Part 1 <br> 
	#text: Part 2 <br><br>
</output>
```
after
```html
<output id="result">
	<br>After normalization:<br> 
	#text: Part 1 Part 2 <br>
</output>
```
<br/>

### CSS관련 메서드


### `element.animate(keyframes, options)`

애니메이션을 자바스크립트로 추가합니다.

예시를 참고해 주세요.

```js
const newspaperSpinning = [
  { transform: "rotate(0) scale(1)" },
  { transform: "rotate(360deg) scale(0)" },
];

const newspaperTiming = {
  duration: 2000,
  iterations: 1,
};

const newspaper = document.querySelector(".newspaper");

newspaper.addEventListener("click", () => {
  newspaper.animate(newspaperSpinning, newspaperTiming);
});
```

<br/>

#### `element.computedStyleMap()`

element에 적용되어 있는 모든 CSS속성을 가져옵니다.

return : readonly StylePropertyMap

```js
// 1.
for (const [prop, val] of allComputedStyles) {
	console.log("prop : ", prop)
  console.log("val :", val + "\n")
}

// 2.
e.computedStyleMap().get("font-size") // {value : 16, unit : 'px'}
```

#### `element.getAnimations({subtree : boolean})`

모든 하위 애니메이션을 가져옵니다.

[mdn getAnimations](https://developer.mozilla.org/en-US/docs/Web/API/Element/getAnimations)을 참고해 주세요.
 
<br/>

### 요소 속성

```js
// Element의 지정된 속성 값을 반환합니다.
element.getAttribute(property)

// XML에서 names를 반환합니다.
element.getAttributeNames()
.
// Iterate over element's attributes
for (const name of element.getAttributeNames()) {
  const value = element.getAttribute(name);
  console.log(name, value);
}
```

> getAttribute만 작성했지만 setAttributeNode, removeAttribute, hasAttributeNode 등이 있습니다. 

<br/>

### 스크린  관련 메서드, 속성

```js
// 요소의 크기를 반환합니다.
element.innerWidth
element.innerHeight

// 페이지의 좌상단 기준 viewport의 수평, 수직 스크롤 위치를 얻습니다.
widow.scrollY, window.scrollX

// 지정된 좌표로 스크롤 합니다.
element.scrollTo(x, y)
window.scrollTo({
	left : 0,
	top : 0,
	behavior : 'smooth' | 'instance' | 'auto'
})

// border를 제외한 요소의 크기를 얻습니다.
element.clientWidth
element.clientHeight

// border를 포함한 요소의 크기를 얻습니다.
element.offsetWidth
element.offsetHeight

// 스크롤 요소의 좌상단 기준(보통 html), 스크롤 요소의 수평, 수직 스크롤 위치를 얻습니다.
element.scrollTop, element.scrollLeft

// 페이지 좌상단 기준 요소의 위치를 얻습니다.
element.offsetLeft 
element.offsetTop

// 엘리먼트를 감싸고 있는 박스들의 크기를 가져옵니다.
element.getClientRects()

// border를 포함한 요소의 크기, 상대 위치 정보를 얻습니다
//  https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
element.getBoundingClientRect()

// 요소를 기준으로 특정 위치로 스크롤 합니다.
// https://developer.mozilla.org/en-US/docs/Web/API/Element/scroll 참고해 주세요.
element.scroll(x,y)
element.scroll(options)

element.scrollTo() // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTo
element.scrollBy() // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollBy
element.scrollIntoView() //h ttps://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView

// 요소를 전체화면 모드로 표시하기 위해 비동기 요청을 발생합니다.
element.requestFullscreen()
// 전체화면 나가기
document.exitFullScreen()

// 포인터를 잠급니다. (특정 범위에 가둡니다, fps 게임용)
// https://developer.mozilla.org/en-US/docs/Web/API/Element/requestPointerLock
// demo : https://mdn.github.io/dom-examples/pointer-lock/
element.requestPointerLock()
```