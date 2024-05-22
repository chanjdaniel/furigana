console.log("activated");
let furiganaDictPath = './furiganaDict.json';
import furiganaDict from furiganaDictPath assert {type: 'json'};

var textNodes = textNodesUnder(document.getRootNode());

for (let i = 0; i < textNodes.length; i++) {
    const textNodeValue = textNodes[i].nodeValue;
    if (containsKanji(textNodeValue)) {

        const splitTextArray = splitText(textNodeValue);
        const replacement = document.createElement("div");
        replacement.style.display = "flex";
        replacement.style.flexDirection = "column";

        let j = 0;
        while (j < splitTextArray.length) {
            const textLine = document.createElement("span");
            textLine.style.display = "flex";
            textLine.style.flexDirection = "row";
            textLine.style.alignItems = "flex-end";
            while (j < splitTextArray.length) {
                const currentText = splitTextArray[j];
                if (currentText == '\n') {
                    j++;
                    break;
                }

                if (containsKanji(currentText)) {
                    const divContainer = document.createElement("div");
                    divContainer.style.display = "flex";
                    divContainer.style.flexDirection = "column";
                    divContainer.style.justifyContent = "center";

                    let context = j < splitTextArray.length ? splitTextArray[j + 1] : "";
                    let furiganaText = getFurigana(currentText, context, furiganaDict);
        
                    const furigana = document.createElement("span");
                    const furiganaTextNode = document.createTextNode(furiganaText);
                    furigana.style.display = "flex";
                    furigana.style.justifyContent = "center";
                    furigana.appendChild(furiganaTextNode);
                    divContainer.appendChild(furigana);

                    const original = document.createElement(textNodes[i].parentNode.tagName);
                    const originalTextNode = document.createTextNode(currentText);
                    original.style.whiteSpace = "nowrap";
                    original.appendChild(originalTextNode);
                    divContainer.appendChild(original);

                    textLine.appendChild(divContainer);

                } else {
                    const original = document.createElement(textNodes[i].parentNode.tagName);
                    const originalTextNode = document.createTextNode(currentText);
                    original.style.whiteSpace = "nowrap";
                    original.appendChild(originalTextNode);
                    textLine.appendChild(original);
                }

                j++;
            }
            replacement.appendChild(textLine);
        }

        var parent = textNodes[i].parentElement;
        parent.replaceChild(replacement, textNodes[i]);
        parent.style.display = "flex";
        parent.style.flexDirection = "row";
        parent.style.alignItems = "flex-end";
    };
};

// input string containing only kanji
// return array of pairs in the form [[furigana, kanji],[furigana, kanji]]
function getFurigana(kanji, context, furiganaDict) {
    furiganaDict["kanji"]["context"];
}

// https://stackoverflow.com/questions/15033196/using-javascript-to-check-whether-a-string-contains-japanese-characters-includi
// returns boolean
// regex match for japanese text
function containsJapanese(text) {
    const re = /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/;
    return re.test(text);
}

// https://stackoverflow.com/questions/15033196/using-javascript-to-check-whether-a-string-contains-japanese-characters-includi
// returns boolean
// regex match for kanji
function containsKanji(text) {
    const re = /[\u4e00-\u9faf\u3400-\u4dbf]/;
    return re.test(text);
}

// https://stackoverflow.com/questions/15033196/using-javascript-to-check-whether-a-string-contains-japanese-characters-includi
// returns boolean
// regex match for hiragana
function containsHiragana(text) {
    const re = /[\u3040-\u309f]/;
    return re.test(text);
}

/**
 * https://stackoverflow.com/questions/10730309/find-all-text-nodes-in-html-page
 * Retrieves an array of all text nodes under a given element.
 *
 * @param { Node } el - The element under which to search for text nodes.
 * @returns { Node[] } An array of text nodes found under the given element.
 */
function textNodesUnder(el) {
    const children = [] // Type: Node[]
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT)
    while(walker.nextNode()) {
      children.push(walker.currentNode)
    }
    return children
  }

  // returns array of string
  // splits text into sections of consecutive japanese or non-japanese text
  function splitText(text) {
    let splitTextArray = [];
    let prev = classifyText(text[0]); // can be kanji, hiragana, newline, or other
    let curr = null;
    let i = 0;
    while (i < text.length) {
        var splitText = "";
        while (i < text.length) {
            curr = classifyText(text[i]);
            if (prev == curr) { // no change in state
                splitText += text[i];
                prev = curr;
                i++;
            } else { // change in state
                prev = curr;
                break;
            };
        };
        splitTextArray.push(splitText);
    };
    return splitTextArray;
  }

  // returns string: one of 'kanji', 'hiragana', 'newline', or 'other'
  function classifyText(text) {
    if (containsKanji(text)) {
        return "kanji";
    } else if (containsHiragana(text)) {
        return "hiragana";
    } else if (text == '\n') {
        return "newline";
    } else {
        return "other";
    }
  }