let color = "#aaaaaa";
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

/*
let previousUrl = "";
const urlObserver = new MutationObserver(function (mutations) {
  if (location.href !== previousUrl) {
    previousUrl = location.href;
    console.log(`URL changed to ${location.href}`);

    observer.disconnect();
    interval();
  }
});
urlObserver.observe(document, { subtree: true, childList: true });
*/

/*
// function that injects code to a specific tab
function injectScript(tabId) {
  console.log("inject");
  chrome.scripting.executeScript({
    target: { tabId: tabId },
    files: ["content-script.js"],
  });
}

// adds a listener to tab change
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // check for a URL in the changeInfo parameter (url is only added when it is changed)
  if (changeInfo.url) {
    // calls the inject function
    injectScript(tabId);
  }
});

if (activeTab.url.includes("twitch.com/") && currentVideo) {
    chrome.runtime.onInstalled.addListener(() => {
      chrome.storage.sync.set({ color });
      console.log('Default background color set to %cgreen', `color: ${color}`);
  });
} else {
  const container = document.getElementsByClassName("container")[0];

  container.innerHTML = '<div class="title">This is not a youtube video page.</div>';
}
*/
