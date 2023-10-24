scrapePage.addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, 
            {
                message: "scrape",
                saveFormat: saveFormatSelect.value.toString()
            }, function(response) {})
    })
});