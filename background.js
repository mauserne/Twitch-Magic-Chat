chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason == "install") {
    console.log("Thank you for download Twitch Magic Chat!");
    chrome.storage.local.set({ switch: true });
  }
});

chrome.tabs.onUpdated.addListener((tabId, tab) => {
  if (tab.url) {
    chrome.tabs.sendMessage(tabId, {
      type: "URL",
      url: tab.url,
    });
  }
});
