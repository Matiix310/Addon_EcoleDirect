const EDurl = "www.ecoledirecte.com"
const countBtn = document.getElementById("count");
const newBtn = document.getElementById("new");
const nsBtn = document.getElementById("ns");

chrome.tabs.query({
    "active": true,
    "currentWindow": true,
    "status": "complete",
    "windowType": "normal"
}, function (tabs) {
    for (let tab in tabs) {
        let url = tabs[tab].url;
        let domain = (new URL(url));
        let page = url.split("/").pop();
        domain = domain.hostname;

        if (domain == EDurl && page == "Notes") {
            countBtn.classList.remove('disabled');
        } else {
            countBtn.classList.add('disabled');
        }
    }
});


// toggle edit mode

countBtn.addEventListener('click', function() {
    if (nsBtn.checked) {
        chrome.tabs.executeScript(null, {file: './js/foreground.js'});
    } else {
        //script sans les notes non-significative, juste les nouvelles notes
        chrome.tabs.executeScript(null, {file: './js/withoutNs.js'});
    }
});

// function getState() {
//     let state = false;
//     chrome.storage.sync.get('isEditing', function(data) {
//         state = data['isEditing'];
//     });
//     return state;
// }

// function saveState(state) {
//     var obj = {};
//     obj['isEditing'] = state;
//     chrome.storage.sync.set(obj);
// }