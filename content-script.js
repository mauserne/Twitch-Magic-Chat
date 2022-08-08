chrome.storage.local.get(["switch"], function (result) {
  if (result.switch) {
    let st = document.createElement("style");
    st.innerText = ".chat-line__message{cursor: pointer}";

    document.head.appendChild(st);

    var s = document.createElement("script");
    s.src = chrome.runtime.getURL("script.js");
    s.onload = function () {
      this.remove();
    };
    (document.head || document.documentElement).appendChild(s);
  }
});
