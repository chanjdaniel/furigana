// background.js
let isExtensionActive = false;

chrome.runtime.onInstalled.addListener(async () => {
    try {
      const response = await fetch(chrome.runtime.getURL("../data/furiganaDict.json"));
      const jsonData = await response.json();
  
      chrome.storage.local.set({ jsonData }, () => {
        console.log('JSON data has been loaded into chrome.storage.local');
      });
    } catch (error) {
      console.error('Failed to fetch and store JSON data:', error);
    }
  });
  
  // Listen for content script requests to get JSON data
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getJsonData') {
      chrome.storage.local.get('jsonData', (result) => {
        sendResponse({ jsonData: result.jsonData });
      });
      // Return true to indicate a response will be sent asynchronously
      return true;
    }
  });

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.command === "press") {

            // Inject the content script
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.scripting.executeScript({
                    target: {tabId: tabs[0].id},
                    files: ['scripts/content.js']
                });
            });

        sendResponse({status: "success"});
    }
});