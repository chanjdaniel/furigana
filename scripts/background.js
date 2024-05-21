// background.js
let isExtensionActive = false;

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
