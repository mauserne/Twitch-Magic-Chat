let title = document.getElementsByTagName('h1')[0];
chrome.tabs.onUpdated.addListener((tabId, tab) => {
	
	if (tab.url){
		console.log(tab.url)
		
		if (tab.url.includes('www.twitch.tv')){
			title.innerText = `You are in twitch now!!`
		} else {
			title.innerText = `You are in ${tab.url} now`
		}
	} 
		

  });

/*
// Initialize butotn with users's prefered color
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  alert(tab.url)
  console.log(tab)
  
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
});

// The body of this function will be execuetd as a content script inside the
// current page
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });
}
*/