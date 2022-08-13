const CHAT_CONTAINER = 'section[data-test-selector="chat-room-component-layout"]';
const CHAT_LIST = ".chat-list,.chat-list--default,.chat-list--other";
const CHAT_MESSAGE_SELECTOR = ".chat-line__message";
const CHAT_INPUT = 'textarea[data-a-target="chat-input"], div[data-a-target="chat-input"]';
const CHAT_WYSIWYG_INPUT_EDITOR = ".chat-wysiwyg-input__editor";

window.FindReact = function (element) {
  for (const key in element) {
    if (key.startsWith("__reactInternalInstance$")) {
      const fiberNode = element[key];
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

function getChatInput(element = null) {
  let chatInput;
  try {
    chatInput = searchReactParents(
      FindReact(element || document.querySelector(CHAT_INPUT)),
      (n) => n.memoizedProps && n.memoizedProps.componentType != null && n.memoizedProps.value != null
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

function getChatMessageObject(element) {
  let msgObject;
  try {
    msgObject = FindReact(element).return.stateNode.props.message;
  } catch (_) {}

  return msgObject;
}


function handler(e) {
  const wrong_target1 = e.target.closest(".Layout-sc-nxg1ff-0.pqFci.chat-line__username-container");
  const wrong_target2 = e.target.closest(".Layout-sc-nxg1ff-0.ewbqxu.chat-line__reply-icon");
  if (wrong_target1 || wrong_target2) {
    return null;
  }

  const target = e.target.closest(".chat-line__message");
  if (target != null) {
    let msgObject = getChatMessageObject(target);
    let chat_text = msgObject.messageBody;
    setChatInputValue(chat_text);
  }
}

document.body.addEventListener("click", handler);
