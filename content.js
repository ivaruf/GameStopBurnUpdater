// content.js
const GameStopBurnMap = new Map();

function supply(item) {
    return item.minted - item.burned
}

function editionsLoaded(targetSpan, item) {
    if (targetSpan[0] !== undefined) {
        var editions = targetSpan[0].innerHTML
        var hasMintedQuantity = editions.indexOf(item.minted) !== -1
        var availableLoaded = editions !== "0/" + item.minted + " available"
        return hasMintedQuantity && availableLoaded;
    }
}

async function updateEditonsElement(item) {
    var attempts = 0
    query = 'span:contains("/minted available")'.replace("minted", item.minted)
    while (attempts < 100) {
        var targetSpan = $(query)
        if (editionsLoaded(targetSpan, item)) {
            var updateValue = targetSpan[0]
            updateValue.style.cssText = "color:red"
            var newValue = updateValue.innerHTML.replace(item.minted, supply(item)) + " 🔥"
            updateValue.innerHTML = newValue
            break;
        }
        await new Promise(r => setTimeout(r, 100));
        attempts++;
    }
}

async function burnAdjust() {
    token = window.location.href.split("/")[5]
    var item = GameStopBurnMap.get(token)
    if (item !== undefined) {
        updateEditonsElement(item)
    }
}

// Gamestop marketplace uses some strange history handling, so we just watch any linked clicked and try to update burns
function callback(e) {
    var e = window.e || e;

    if (e.target.tagName !== 'A') {
        return;
    }

    burnAdjust();
}

if (document.addEventListener) {
    document.addEventListener('click', callback, false);
} else {
    document.attachEvent('onclick', callback);
}

$(document).ready(function () {
    $.get("https://raw.githubusercontent.com/ivaruf/GameStopBurnUpdater/master/data/GameStopTokenBurnMap.json", function (burnMap) {

        for (const [key, value] of Object.entries(JSON.parse(burnMap))) {
            var item = {
                "minted": value.minted,
                "burned": value.burned
            }
            GameStopBurnMap.set(key, item)
        }
        burnAdjust()
    });
})








