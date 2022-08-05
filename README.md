# Twitch Magic Chat

> ### [Chrome Extension] 트위치 채팅 원클릭 복사✨

## 기능 설명

다른사람의 채팅을 클릭하면, 그 내용을 내 채팅 입력창으로 즉시 가져옵니다.

Click other's chat, Bringing the content into my Chat-input immediately.

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
