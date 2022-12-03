chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.update(tab.id, {
    url: chrome.runtime.getURL("index.html"),
  });
});
