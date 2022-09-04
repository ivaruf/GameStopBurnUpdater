// content.js

// TODO put burn map in separate file, that loads latest version (even if plugin is old)
burnMap = new Map([
    ['0x3b66eead9d7f4d57d7f33aa3a5e27971fef9d8381ccdde8792bc2e2b084aac56', { 'burned': 225, 'minted': 500 }], // #01_Fake Heels
    ['0x11087ebd3afcc64d149baab2a843a291a35dab35e046d89d9659bf1fc0f50f84', { 'burned': 258, 'minted': 500 }], // #05_Kostika
    ['0x6e364e871068cb5b0150266ea7c39a458cc026b393b2049f4f31a9a910d60e9c', { 'burned': 255, 'minted': 500 }] // #04_Draconya
])

function supply(item) {
    return item.minted - item.burned
}
function editionsLoaded(targetSpan, itemDetails) {
    var editions = targetSpan[0].innerHTML
    var hasMintedQuantity = editions.indexOf(itemDetails.minted) != -1
    var availableLoaded = editions.indexOf("0/" + itemDetails.minted) == -1
    console.log(editions)

    return hasMintedQuantity && availableLoaded;
}

async function updateEditonsElement(itemDetails) {
    var attempts = 0
    query = 'span:contains("/minted available")'.replace("minted", itemDetails.minted)
    while (attempts < 100) {
        query = 'span:contains("/minted available")'.replace("minted", itemDetails.minted)
        var targetSpan = $(query)
        if (targetSpan[0] !== undefined && editionsLoaded(targetSpan, itemDetails)) {
            var updateValue = targetSpan[0]
            var newValue = updateValue.innerHTML.replace(itemDetails.minted, supply(itemDetails))
            updateValue.innerHTML = newValue
            break;
        }
        await new Promise(r => setTimeout(r, 100));
        attempts++;
    }
}

async function burnAdjust() {
    token = window.location.href.split("/")[5]
    var itemDetails = burnMap.get(token)
    if (itemDetails !== undefined) {
        updateEditonsElement(itemDetails)
    }
    
}

burnAdjust()


