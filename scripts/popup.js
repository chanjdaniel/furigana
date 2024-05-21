// popup.js
document.getElementById('switch-rounded').addEventListener('click', function() {
    chrome.runtime.sendMessage({command: "press"}, function(response) {
        console.log('button pressed', response.state);
    });
});
