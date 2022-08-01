# Twitch-chat-rapid-copier

원클릭 트위치 채팅 복사
Twitch Chat Helper
Twitch Magic Chat

## 만든 이유

트위치 채팅에 ㅋㅋㅋ 치기 귀찮아서

---

## 개발과정

처음엔 단순하게 DOM에서 document.querySelector() 로 채팅 input 엘리먼트 찾아서 value 변경하면 되겠지~ 싶었는데, value를 바꿔도 적용이 되지 않는다.

Twitch 사이트가 React 기반이고, input을 slate.js 라이브러리를 통해 구현한 듯 하다.

그리고 React에서 input은 유저가 타이핑을 할때 이벤트를 수신하여 입력되는 글자가 적용이 된다 (추정임) value를 바꿔도 유저의 타이핑이 없으니 이벤트가 수신되지 않아서 적용이 되지 않는다.

그래서 이벤트를 발생시키기 위해 방법을 찾았지만,
문제는 사이트가 React 기반이고, 이벤트를 state,props을 통해 전달하는데
React는 VirtualDOM을 이용한다. VirtualDOM에서 DOM으로 정보를 뿌린다(추정)

이런 겹겹이 쌓인 과정속에서 추상화된 이벤트를 찾기가 어려웠다.

stackoverflow를 뒤져보니 자료가 적었지만 그와중에도 나와 비슷한 고민이 있던 사람이 있었고 다행히 답변도 있었다.
https://stackoverflow.com/questions/67687889/how-do-i-change-slate-editor-value-using-javascript-dom-manipulation

트위치에서 유명한 익스텐션인 BTTV Extension 의 깃허브를 알게되었고, 내가 원하는 기능을 야무지게 구현해놓았더라.
https://github.com/night/betterttv

일단은 감사하게 복사해왔는데
나중에라도 분석해봐야겠다.

---

## 문제 1

익스텐션을 사용하면
때때로 다른사람 채팅이 올라올때 채팅창 프리징, 또는 방송 딜레이가 발생한다.

이유를 생각해보면

1. mutationObserver 의 성능문제
2. chatObserver 와 urlObserver 두개의 옵저버가 돌아가고 있어서
3. 여러개의 채팅 엘리먼트에 attribute 추가하는 과정에서 성능저하

아마도 1번 문제일 것 같다.
디바운싱이라고 일종의 버퍼를 만들어서 성능을 개선하는 법이 있는것같은데,
https://stackoverflow.com/questions/66758732/mutation-observer-emits-n-number-of-changes-which-makes-my-other-functions-slow

일단은 기능적으로 문제는 없으니
이거 deploy 하고나서 해결하고싶다.

---

## TODO

깃 버젼관리 배우기

1. popup에 익스텐션 on off 기능 만들기 (on off 변경시 새로고침이 필요합니다 메세지 출력)
2. popup에 내 정보 넣기?
3. option창 없애기?
4. deploy
