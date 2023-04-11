const $toggle = document.querySelector(".toggleSwitch");
const modal = document.querySelector(".modal");
const ad = document.querySelector(".ad");

chrome.storage.local.get(["switch"], function (result) {
  if (result.switch) {
    $toggle.className = "toggleSwitch actived-already";
  }
});

$toggle.onclick = () => {
  if ($toggle.className === "toggleSwitch actived-already") {
    $toggle.className = "toggleSwitch active";
  }

  $toggle.classList.toggle("active");
  if ($toggle.className === "toggleSwitch active") {
    chrome.storage.local.set({ switch: true });
  } else {
    chrome.storage.local.set({ switch: false });
  }
  modal.className = "modal show";
};

ad.onclick = () => {
  chrome.tabs.create({
    //Naver cafe Marker 크롬 웹스토어 페이지 url
    url: "https://chrome.google.com/webstore/detail/lphpmikcjefadjcdeojodcjenkkkdnbm?authuser=0&hl=ko",
    selected: true,
    active: true,
  });
};
