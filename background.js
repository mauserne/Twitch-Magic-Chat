let color = "#aaaaaa";
chrome.tabs.onUpdated.addListener((tabId, tab) => {
  if (tab.url) {
    console.log(tab);
    chrome.tabs.sendMessage(
      tabId,
      {
        type: "NEW",
        url: tab.url,
      },
      function (response) {
        console.log(response);
      }
    );
  }
});

/*
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
