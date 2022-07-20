console.log(12312312);

const CHAT_INPUT = 'textarea[data-a-target="chat-input"], div[data-a-target="chat-input"]';



var config = {attributes: true, childList: false, characterData: true};

var chat_line = document.getElementsByClassName('chat-line__message');
var text_field;


function getReactInstance(element) {
    return 1
    for (const key in element) {
      if (key.startsWith('__reactInternalInstance$')) {
        console.log('gRI success')
        return element[key];
      }
    }
    console.log('gRI failed')
    return null;
}

function searchReactParents(node, predicate, maxDepth = 100, depth = 0) {
    console.log('node :',node,'predicate :',predicate)
    try {
      if (predicate(node)) {
        return null;
      }
    } catch (_) {}
  
    if (!node && depth == maxDepth) {
      return 'reaching maxDeapth';
    }
  
    const {return: parent} = node;
    if (parent) {
      return searchReactParents(parent, predicate, maxDepth, depth + 1);
    }
  
    return null;
}
  

  function getChatInput(element = null) {
    let chatInput;
    console.log(element, document.querySelectorAll(CHAT_INPUT)[0])
    try {

      chatInput = searchReactParents(
        //getReactInstance(element),
        element,
        (n) => n.memoizedProps && n.memoizedProps.componentType != null && n.memoizedProps.value != null
      );

    } catch (_) {console.log('err at getChatinput')}
    
    return chatInput;
  }

  function inject_text(text){
      var textbox = document.querySelector('div[role="textbox"]');
      var ins;
      for (const key in textbox){
          if (key.startsWith('__reactInternalInstance$')){
              ins = key
              break
          }
      }
      console.log(ins,'ins')
      var textboxInput = getChatInput(ins);
      if (textboxInput == null) {
          return;
      }
      textboxInput.memoizedProps.value = text;
      textboxInput.memoizedProps.setInputValue(text);
      textboxInput.memoizedProps.onValueUpdate(text);
  }

function tagchange(){
    text_field = document.getElementsByClassName('chat-wysiwyg-input__editor')[0];
    Array.from(chat_line).forEach(element => {
        console.log(chat_line.length);
        element.setAttribute('style',"cursor: pointer");

        element.addEventListener('click', function(){
            var chat_text = element.getElementsByClassName('text-fragment')[0].innerHTML;
            navigator.clipboard.writeText(chat_text).then(function() {
                console.log('Pasted content: ',chat_text);
            });

            //inject_text(chat_text)
            text_field.focus()
            text_field.click()

            document.dispatchEvent(
                new KeyboardEvent("keydown", {
                    key: "v",
                    ctrlKey: true,
                    bubbles: true,
                    metaKey: true   
                })
            );



            //navigator.clipboard.readText().then(
              //clipText => text_field.children[0].innerText = clipText);

        })
    });
    
}


setInterval( tagchange , 5000);


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