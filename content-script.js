chrome.storage.local.get(["switch"], function (result) {
  if (result.switch) {
    var s = document.createElement("script");
    s.src = chrome.runtime.getURL("script.js");
    s.onload = function () {
      this.remove();
    };
    (document.head || document.documentElement).appendChild(s);
  }
});

console.log("content-script");
