# Twitch Magic Chat

> ### [Chrome Extension] 트위치 채팅 원클릭 복사✨

<img width="80%" src="https://user-images.githubusercontent.com/52377363/183247232-f6b34509-991f-481f-9fac-bfd40162fa8e.png"/>

## 설치

[![Chrome Web Store](https://storage.googleapis.com/web-dev-uploads/image/WlD8wC6g8khYWPJUsQceQkhXSlv1/UV4C4ybeBTsZt43U4xis.png)](https://chrome.google.com/webstore/detail/mgdehebdbghhagjeicebdhkdbkemaefm)

## 기능 설명

클릭 한 번에 채팅을 복사해오는 확장 프로그램입니다.

Copying chat with single-click on Twitch.tv

## 사용법

Twitch Magic Chat을 활성화시키고,

트위치 방송에서 다른사람의 채팅을 클릭하면, 내용을 즉시 나의 채팅 입력창으로 가져옵니다.

Click other's chat, The content brought into your Chat-input immediately.

## 디자인

<img width="50%" src="https://user-images.githubusercontent.com/52377363/183247372-ffd6c518-cec2-4914-b36e-eff5e4a35f0c.PNG"/>

## 만든 이유

채팅에 ㅋㅋㅋ 치기 귀찮아서

## 개발과정

<details>
<summary>접기/펼치기 버튼</summary>
<div markdown="1">

처음엔 단순하게 DOM에서 `document.querySelector()` 로 채팅 input 엘리먼트 찾아서 value 변경하면 되겠지~ 싶었는데, value를 바꿔도 적용이 되지 않는다.

Twitch 사이트가 React 기반이고, input을 slate.js 라이브러리를 통해 구현한 듯 하다.

그리고 React에서 input은 유저가 타이핑을 할때 이벤트를 수신하여 입력되는 글자가 적용이 된다 (추정임) value를 바꿔도 유저의 타이핑이 없으니 이벤트가 수신되지 않아서 적용이 되지 않는다.

stackoverflow를 뒤져보니 자료가 적었지만 그와중에도 나와 비슷한 고민이 있던 사람이 있었고 다행히 [답변](https://stackoverflow.com/questions/67687889/how-do-i-change-slate-editor-value-using-javascript-dom-manipulation)도 있었다.

하지만 저 코드 그냥 베끼기 싫어서
내 힘으로 해결하고자

이벤트를 발생시키기 위한 방법들을 찾았지만,
문제는 사이트가 React 기반이고, 이벤트를 state,props을 통해 전달하는데

React는 VirtualDOM을 이용한다. VirtualDOM에서 DOM으로 정보를 뿌린다(추정)

이런 겹겹이 쌓인 과정속에서 추상화된 이벤트를 찾기가 어려웠다.

트위치에서 유명한 익스텐션인 [BTTV Extension 의 깃허브](https://github.com/night/betterttv)를 알게되었고, 내가 원하는 기능을 야무지게 구현해놓았더라.

일단은 감사하게 복사해왔는데
나중에라도 분석해봐야겠다.

다운로드했을때 기능을 active 상태로 만들기위해
[다운로드후 최초 실행 감지](https://stackoverflow.com/questions/2399389/detect-chrome-extension-first-run-update) 방법을 찾아보았다.

---

</div>
</details>

## References

본 확장 프로그램을 만들면서 참고한 자료들 입니다.

<details>
<summary>접기/펼치기 버튼</summary>
<div markdown="1">

## 크롬 익스텐션

* ### [Getting started - Chrome Developers](https://developer.chrome.com/docs/extensions/mv3/getstarted/)
* [chrome.storage API - Chrome Developers](https://developer.chrome.com/docs/extensions/reference/storage/)
  * 사용자 설정 저장
* [Content scripts - Chrome Developers](https://developer.chrome.com/docs/extensions/mv3/content_scripts/)
  * `content-script.js` 를 통해 페이지의 데이터를 제한적으로 읽거나 수정할 수 있다.

## 트위치 채팅 관련기능

- ### [night/BetterTTV/twitch.js - Github.com](https://github.com/night/betterttv/blob/master/src/utils/twitch.js)

### script injection
- [Use a content script to access the page context variables and functions - stackoverflow.com](https://stackoverflow.com/questions/9515704/use-a-content-script-to-access-the-page-context-variables-and-functions/9517879#9517879)

  * 크롬 익스텐션의 `content-script.js` 는 독립적인 환경위에서 동작하므로, 제한적으로 페이지의 내용을 읽고 쓸 수 있다. 페이지에 스크립트를 주입하면 직접적으로 페이지의 변수나 함수에 접근할 수 있게 된다.

  * 나는 페이지의 reactinstance 속성에 접근이 필요해서 스크립트를 주입했다.

* [MutationObserver Web API - MDN Docs](https://developer.mozilla.org/ko/docs/Web/API/MutationObserver)
  * DOM 변화를 관찰하는 API
  * 트위치 채팅창에 채팅이 새로 올라오는 것을 감지하고, URL변화를 감지하기 위해 사용했다. 

* [Attach event to dynamic elements in javascript - stackoverflow.com](https://stackoverflow.com/questions/34896106/attach-event-to-dynamic-elements-in-javascript)
  * 동적인 요소에 클릭 이벤트를 감지하는 방법
  * MutationObserver 대신 사용하는데 관리도 편하고 성능도 더 좋아진것 같다.
* [Element.closet() - MDN Docs](https://developer.mozilla.org/ko/docs/Web/API/Element/closest)
  * 부모요소를 타고 document까지 올라가면서 argument를 발견하면 true를 반환한다.
  * e.target 은 클릭한 대상에 대해서만 이벤트가 발생해서, closet으로 처리를 해주었다.



## 디자인

* [[CSS] 토글 스위치 버튼 만들기 - 나를 제외한 천재들](https://gurtn.tistory.com/161)

---

</div>
</details>


## TODO

0. 깃 버젼관리 배우기 🤔
1. popup에 익스텐션 on/off 기능 만들기 (on/off 변경시 새로고침이 필요합니다 메세지 출력) ✅
2. popup에 내 정보 넣기? ✅
3. option창 없애기? ✅
4. deploy
5. Readme 수정하기 (예쁘게 꾸미기)
6. 리팩토링하기 (코드 예쁘게 수정하기)
