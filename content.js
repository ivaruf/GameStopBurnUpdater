// content.js

burnMap = new Map([
    ['#01_Fake Heels', { 'burned': 225, 'minted': 500 }],
    ['#05_Kostika', { 'burned': 258, 'minted': 500 }],
    ['#04_Draconya', { 'burned': 255, 'minted': 500 }]
])

function supply(item) {
    return item.minted - item.burned
}

async function getItemNameFromHeading() {
    while (true) {
        var headers = document.getElementsByTagName("h1")
        heading = headers[0]
        if (heading === undefined) {
            await new Promise(r => setTimeout(r, 100));
        } else {
            return heading.innerHTML
        }
    }
}

async function getEditonsElement(itemDetails) {
    query = 'span:contains("/minted available")'.replace("minted", itemDetails.minted)
    while (true) {
        
    }
}

function hasMintedQuantity(targetSpan, itemDetails) {
    return targetSpan[0].innerHTML.indexOf(itemDetails.minted) != -1;
}

async function burnAdjust() {
    itemName = await getItemNameFromHeading()
    var itemDetails = burnMap.get(itemName)


    
    query = 'span:contains("/minted available")'.replace("minted", itemDetails.minted)
    var targetSpan = $(query)
    if (targetSpan[0] !== undefined && hasMintedQuantity(targetSpan, itemDetails)) {
        var updateValue = targetSpan[0]
        var newValue = updateValue.innerHTML.replace(itemDetails.minted, supply(itemDetails))
        updateValue.innerHTML = newValue
    }
}

burnAdjust()


