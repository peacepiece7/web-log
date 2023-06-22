
# 개발자의 글쓰기

## 글쓰기 방법

1. 서술식

~다 로 끝남

개발 가이드에서 많이 사용

2. 개조식

명사 (완료, 증대 등)이나 ~했음으로 용언을 끝냄

릴리즈 문서, 장애 보고서

3. 도식

표, 그래프를 사용

사물의 구조, 관계를 표현
                  
## 영어 단어 선택

 **단어에 의도를 정확히 담기, 중요한 건 일관성**
### 반대말 선택

반대말에 주의하여 사용하기

fade in/out, appear/disappear, show/hide, visible/invisible

header/footer, head/tail, top/bottom, start/end, first/last

under/over, or under/and over, above/below, up/down, ascend/descend, rise/fall

### 유의어

1. 중단

stop : 잠시 중단

end : 완전히 중단됨

finish : 끝까지 가서 재시작 가능성이 없음

pause : 아무 잠시 중단

suspend : 다음 단계의 시작을 중단 

hold : 의도가 있어서 중단,

2. 가져오기
   
get : 얻다. 값을 돌려받아서 반환한다.

retrieve : 검색하다. 검색해서 가져온다.

acquire : 습득하다. 다른 함수에서 가져가지 못하게 독점한다.

fetch : 가져오다. 포인터가 다음 값으로 이동한다. (참조가 변경됨)

2. 설정하기

set : 설정하다. 값을 변경하거나 설정한다.

create : 생성하다. 새로운 틀을 만들다.

register : 등록하다. 이미 정해진 틀에 새로운 것을 등록한다.

init : 초기화하다. 처음 상태로 되돌린다.

3. 수정하기

change : 바꾸다. 내용을 변경하다.

modify : 수정하다. 잘못된 것을 바로잡다.

alter : 변경하다. 원래의 것을 다른 것으로 바꾼다.

revise : 개정하다. 기존과 전혀 다르게 달려졌음을 분명히 나타낸다.

4. 속성

parameter : 함수에서 정의하는 변수, 선언할 떄

argument : 함수를 호출할 때 전달하는 값, 실제 사용되는 값

attribuite, property : 속성, HTML Tag 속성은 attribute,  HTML  DOM은 property (언어마다 다름)

5. etc

must : 필수 요구사항 (required)

should : 권장사항 (recommended)

can : 선택사항 (optional)

## 이름 짓기는 조합

### 컨벤션

Class, Constructor function : PascalCase

Function, Variable : camelCase

Constant : SNAKE_CASE (ALL_CAPITAL_LETTERS)

local variable, private variable : startWith underscore(_)

acronyms : HTML, HTTP, XML, URL, etc

### 네이밍

보통 16글자, 3단어 조합

### 보통 품사는 명사, 동사, 형용사의 조합

품사 : 낱말의 공통된 설질에 따라 분류한 것 (명사, 동사, 형용사, 부사, 전치사...)

1. 명사 + 명사 + 명사

2. 동사 + 명사 + 명사

3. 형용사 + 명사 + 명사 

## 팁
### 베열

~s 가 문자열 중간에 붙는다면

~ListOf~ 나 ~Array~로 규칙을 통일한다.
### 함수

1. 사용자가 아니라 시스템이 하는 일을 동사로 표현
2. 의미상 없어도 되는 단어 생략

### 약어

보편적인건 그대로 사용하고

서비스에 맞게 용어 정의서를 작성한다.

### 중요한 단어를 앞으로

totalVisitor => visitorTotal, buyerTotal


### 접두어

비동기 상태 표현, 에러 코드 등 접두어를 사용하여 검색, 가독성을 높인다.

### 언어의 사회성

누가봐도 아는 것은 그대로 두기

```js
for(let i = users, len=users.length; i < len; i++) {
    // ... The rest of the code
}
```

## 주석 

1. 좋은 코드는 코드가 곧 주석이다. 하지만 영어 실력이 별로라면 주석을 달자
2. 의도, 아이디어, 의견 등을 전달하는 주석은 필요하다.
3. 주석도 코드에 맞춰서 업데이트하기, 틀린 주석이 제공되어선 안된다.