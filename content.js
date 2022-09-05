// content.js

// Tasks
// TODO get rid of jQuery?

function supply(item) {
    return item.minted - item.burned
}
function editionsLoaded(targetSpan, item) {
    if (targetSpan[0] !== undefined) {
        var editions = targetSpan[0].innerHTML
        var hasMintedQuantity = editions.indexOf(item.minted) != -1
        var availableLoaded = editions.indexOf("0/" + item.minted) == -1
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
    var item = GameStopTokenBurnMap.get(token)
    if (item !== undefined) {
        updateEditonsElement(item)
    }
}

burnAdjust()


