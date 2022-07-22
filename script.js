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
      console.log("fibernode: ") + console.log(fiberNode);
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

// 채팅 input 내용 리턴받기
function getChatInputValue() {
  const element = document.querySelector(CHAT_INPUT);

  const chatInput = getChatInput(element);
  if (chatInput == null) {
    return null;
  }

  return chatInput.memoizedProps.value;
}

function tagchange() {
  var chat_line = document.getElementsByClassName("chat-line__message");

  Array.from(chat_line).forEach((element) => {
    element.setAttribute("style", "cursor: pointer");

    element.addEventListener("click", function () {
      var chat_text =
        element.getElementsByClassName("text-fragment")[0].innerHTML;
      setChatInputValue(chat_text);
      navigator.clipboard.writeText(chat_text).then(function () {
        console.log("Pasted content: ", chat_text);
      });

      //navigator.clipboard.readText().then(
      //clipText => text_field.children[0].innerText = clipText);
    });
  });
}

setInterval(tagchange, 5000);

/*
chrome.tabs.onUpdated.addListener((tabId, tab) => {
	if (tab.url){
		console.log(tab.url,tabId)
    chrome.tabs.sendMessage(tabId, 'Hi', data =>{    //a에 Hi를 넣어 보내고 콜백
    	console.log(data); // Hello!
    });
  }  
});
*/
