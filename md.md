# Fast campus 5차 과제 회고

05.30 ~ 06.30 한 달간 진행한 팀 프로젝트를 회고하는 글입니다.

## 소개

닌텐도를 벤치마킹하여 게임 판매 사이트를 제작하였다.

[github](https://github.com/FastCampusGroup6/ToyProject__Nintendo)

### 기획

- 프로토타입 설계 (Figma)
- 플로우 차트 설계 (drow.io)

![work flow](https://peacepiece7.github.io/blog-static-assets/toy5/workflow.PNG 'large')

### 도구

React, TypeScript, Recoil, Puppeteer, Sass, antd 

## Keep

### 소통

팀원들과의 소통이 원활하게 이루어진 점이 좋았다.

다시 한번 사람이 제일 중요하다는 것을 느꼈다.

### Github

github으로 어떻게 협업해서 개발하는지 알게되었다.

- **oranization으로 repo 관리**
- **git flow로 브랜치 관리** 
- main 브랜치는 rebase, release 브랜치는 squash로 **커밋 히스토리 관리**
- release 브랜치를 따로 두어서 **버전 관리**
- issue를 발행하고 브렌치와 연결하여 **이슈 관리**

## Problem

### 기술 

제한 시간 안에 모두가 할 수 있는 스택을 선택해야 했기 때문에 선택의 폭이 생각보다 좁았다.

서버 쪽도 건들일 수가 없었기 떄문에 지속적으로 운영 해볼 만 한 아이디어가 나올 수 없었고 포트폴리오에 추가할 만한 퀄리티가 나오지 못했다.

CSS framework로 화면 단을 만들거나 headless CMS로 admin페이지를 끝내고 프런트 외적인 부분에서 팀원들이 인사이트를 얻어가길 바랐는데 여러가지 제약이 있어서 여기까지는 힘들었다.

### 리뷰

초기 개발단계에서 코드 리뷰를 하는 건 어려운 일이라는 생각이 들었다.

HTML, CSS가 합쳐지면서 코드양이 상당하기 때문에 시간을 내서 리뷰를 진행해야 하는데 이를 위한 시간을 내기가 쉽지 않았다.

PM이 필요하다는 생각이 들었다.

### 리팩토링

SEO를 위한 Core Web Vital을 같이 고민해 보거나, 어려 프로젝트를 모노레포로 관리하거나, 주요 페이지와 메타데이터는 서버에서 렌더링이 되도록 설계를 변경하는 등

해볼 수 있는 요소는 많았는데 막상 화면과 주요 기능을 완성하니 6월이 끝나버렸다.

### 협업

github의 기능을 최대한 활용해보고 커밋을 깔끔하게 유지했어야 했는데

conflict의 원인을 찾아보지 않고 reset으로 해결하거나 Feature 브랜치에 force push 했던 점이 아쉬웠다.

## Try

### 깊이 있게 하나의 기술만

프로젝트의 완성도 중요하지만, 문제의 원인을 이해하고 해결해 보는 경험이 더 중요하다고 생각한다.

다음 프로젝트에서는 깊이 있게 하나의 기술을 공부하고 적용해 보고 싶다.

### 환경 설정을 많이 해보자

webpack, tsconfig, eslintrc의 설정을 온전히 이해하고 쓰지 못했던 것 같다.

초기 환경 설정을 하는데 생각보다 많은 부분에서 문제가 있었다.

boilerplate code를 많이 만들어 둬야겠다.















