console.log("script");

// 트위치 채팅 복사
// https://github.com/night/betterttv/blob/1723f4a8051a7e4ffda88e66cdde851ed53e5e2d/src/utils/twitch.js

const REACT_ROOT = "#root";
const CHAT_CONTAINER =
  'section[data-test-selector="chat-room-component-layout"]';
const VOD_CHAT_CONTAINER = ".qa-vod-chat,.va-vod-chat";
const CHAT_LIST = ".chat-list,.chat-list--default,.chat-list--other";
const PLAYER = ".video-player__container";
const CLIPS_BROADCASTER_INFO = ".clips-broadcaster-info";
const CHAT_MESSAGE_SELECTOR = ".chat-line__message";
const CHAT_INPUT =
  'textarea[data-a-target="chat-input"], div[data-a-target="chat-input"]';
const CHAT_WYSIWYG_INPUT_EDITOR = ".chat-wysiwyg-input__editor";
const COMMUNITY_HIGHLIGHT = ".community-highlight";

const USER_PROFILE_IMAGE_GQL_QUERY = `
query GetUserProfilePicture($userId: ID!) {
  user(id: $userId) {
    profileImageURL(width: 300)
  }
}
`;

function getReactInstance(element) {
  for (const key in element) {
    if (key.startsWith("__reactInternalInstance$")) {
      return element[key];
    }
  }

  return null;
}

window.FindReact = function (el) {
  for (const key in el) {
    if (key.startsWith("__reactInternalInstance$")) {
      const fiberNode = el[key];
      return fiberNode;
      // return fiberNode && fiberNode.return && fiberNode.return.stateNode;
    }
  }
  return null;
};

function searchReactParents(node, predicate, maxDepth = 15, depth = 0) {
  try {
    if (predicate(node)) {
      return node;
    }
  } catch (_) {}

  if (!node || depth > maxDepth) {
    return null;
  }

  const { return: parent } = node;
  if (parent) {
    return searchReactParents(parent, predicate, maxDepth, depth + 1);
  }

  return null;
}

// 기능
function getChatInput(element = null) {
  let chatInput;
  try {
    chatInput = searchReactParents(
      FindReact(element || document.querySelector(CHAT_INPUT)),
      (n) =>
        n.memoizedProps &&
        n.memoizedProps.componentType != null &&
        n.memoizedProps.value != null
    );
  } catch (_) {}

  return chatInput;
}

function getChatInputEditor(element = null) {
  let chatInputEditor;
  try {
    chatInputEditor = searchReactParents(
      FindReact(element || document.querySelector(CHAT_INPUT)),
      (n) => n.stateNode?.state?.slateEditor != null
    );
  } catch (_) {}

  return chatInputEditor?.stateNode;
}

// 채팅 input에 텍스트 넣기
function setChatInputValue(text, shouldFocus = true) {
  const element = document.querySelector(CHAT_INPUT);

  const chatInput = getChatInput(element);
  if (chatInput == null) {
    return;
  }

  chatInput.memoizedProps.value = text;
  chatInput.memoizedProps.setInputValue(text);
  chatInput.memoizedProps.onValueUpdate(text);

  if (shouldFocus) {
    const chatInputEditor = getChatInputEditor(element);
    if (chatInputEditor != null) {
      chatInputEditor.focus();
      chatInputEditor.setSelectionRange(text.length);
    }
  }
}

///

//뮤테이션 옵저버

function getChatMessageObject(element) {
  let msgObject;
  try {
    msgObject = getReactInstance(element).return.stateNode.props.message;
  } catch (_) {}

  return msgObject;
}

// 변화 감지 설정입니다.
const config = { attributes: false, childList: true, subtree: true };

// 변화가 감지될 때 실행할 콜백 함수
const callback = function (mutationsList, observer) {
  for (let mutation of mutationsList) {
    if (
      mutation.addedNodes.length == 1 &&
      mutation.addedNodes[0].className === "chat-line__message"
    ) {
      mutation.addedNodes[0].setAttribute("style", "cursor: pointer");
      mutation.addedNodes[0].addEventListener("click", function () {
        let msgObject = getChatMessageObject(mutation.addedNodes[0]);
        var chat_text = msgObject.messageBody;
        setChatInputValue(chat_text);
        console.log(mutation.addedNodes[0]);
      });
    }
  }
};

// 콜백 함수가 연결된 옵저버 인스턴스를 생성합니다.

const observer = new MutationObserver(callback);

function chatarea_Detect() {
  let interval = setInterval(() => {
    console.log("인터벌");
    let targetNode = document.querySelector(
      ".chat-scrollable-area__message-container"
    );
    if (targetNode != null) {
      // 선택한 노드의 변화 감지를 시작합니다.
      observer.observe(targetNode, config);
      clearInterval(interval);
      console.log("인터벌종료");
    }
  }, 1000);
}

chatarea_Detect();

let previousUrl = "";
const urlObserver = new MutationObserver(function (mutations) {
  if (location.href !== previousUrl) {
    previousUrl = location.href;
    console.log(`URL changed to ${location.href}`);

    observer.disconnect();
    chatarea_Detect();
  }
});
urlObserver.observe(document, { subtree: true, childList: true });

console.log("end");

/*
todo
(해결)url 변경시 observe 재수행
ㄴ  urlobsever 새로 만들어서 해결

!!!! 최적화 필요
!!!!  방송딜레이 4초 이상 발생

채팅이 순간 많이 올라오면 프리징 발생 >> 아마도 채팅 하나씩 처리하는 시간때매 그런듯
>>debounce라고 버퍼 만드는 법이 있는듯 
https://stackoverflow.com/questions/66758732/mutation-observer-emits-n-number-of-changes-which-makes-my-other-functions-slow

채팅 닉네임 클릭방지? 버블링?

*/
