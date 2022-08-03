chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason == "install") {
    console.log(
      "Thank you for download Twitch Magic Chat! default value is 'active' "
    );
    chrome.storage.local.set({ switch: true }, () =>
      console.log("default is true")
    );
  }
});

chrome.tabs.onUpdated.addListener((tabId, tab) => {
  console.log(tab);
  if (tab.url) {
    console.log(tab.url, "url detected");
    chrome.tabs.sendMessage(
      tabId,
      {
        type: "URL",
        url: tab.url,
      },
      function (response) {
        console.log(response);
      }
    );
  }
});
