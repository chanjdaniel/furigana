// popup.js
document.getElementById('switch-rounded').addEventListener('click', function() {
    chrome.runtime.sendMessage({command: "toggle"}, function(response) {
        console.log('Toggle state changed', response.state);
    });
});
