chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason == "install") {
    console.log("Thank you for download Twitch Magic Chat!");
    chrome.storage.local.set({ switch: true });
  }
});
