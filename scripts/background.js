// background.js
let isExtensionActive = false;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.command === "toggle") {
        isExtensionActive = !isExtensionActive;  // Toggle the state

        if (isExtensionActive) {
            // Inject the content script
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.scripting.executeScript({
                    target: {tabId: tabs[0].id},
                    files: ['scripts/content.js']
                });
            });
        } else {
            // Remove the content script by reloading the tab
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.reload(tabs[0].id);
            });
        }

        sendResponse({status: "success", state: isExtensionActive});
    }
});
