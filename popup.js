const $toggle = document.querySelector(".toggleSwitch");
const modal = document.querySelector(".modal");

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
