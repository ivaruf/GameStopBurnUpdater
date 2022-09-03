// content.js

burnMap = new Map([
    ['#01_Fake Heels', { 'burned': 225, 'minted': 500 }],
    ['#05_Kostika',  { 'burned': 258, 'minted': 500 }],
    ['#04_Draconya', { 'burned': 255, 'minted': 500 }]
])

function supply(item) {
    return item.minted - item.burned
}

// Trying to not get an infinite loop here
var attempts = 0
async function burnAdjust() {
    while (attempts < 100) {
        var headers = document.getElementsByTagName("h1")
        heading = headers[0]
        if(heading !== undefined) {
            itemName = heading.innerHTML
            var itemDetails = burnMap.get(itemName)

            if (itemDetails === undefined) {
                break;
            } 
            query = 'span:contains("/minted available")'.replace("minted", itemDetails.minted)
            var targetSpan = $(query)
            if(targetSpan[0] !== undefined && targetSpan[0].innerHTML.indexOf(itemDetails.minted) != -1) {
                var updateValue = targetSpan[0]
                var newValue = updateValue.innerHTML.replace(itemDetails.minted, supply(itemDetails))
                updateValue.innerHTML = newValue
                break;
            }
        } 
        await new Promise(r => setTimeout(r, 100));
        attempts++;
    }
}
burnAdjust()
