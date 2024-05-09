var text = document.getElementsByTagName("*");

var matches = [];

for (var i = 0; i < text.length; i++) {
    // console.log(text[i]);
    // const replacement = document.createElement(text[i].tagName);
    // const node = document.createTextNode("poopy");
    // replacement.appendChild(node);

    // const parent = text[i].parentElement;
    // parent.replaceChild(replacement, text[i]);
    if (containsJapanese(text[i])) {
        console.log(text[i]);
    }
}

function containsJapanese(element) {
    const re = /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/;
    const text = element.innerText;
    return re.test(text);
}