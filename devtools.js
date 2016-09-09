var port = chrome.runtime.connect({name: 'devtools'});

port.onMessage.addListener(function(msg){
    
});

var i=0;

chrome.devtools.network.onRequestFinished.addListener(function(request){
    i++;
    chrome.devtools.network.getHAR(function xxx(result){
        if (i === result.entries.length) {
            console.log(result);
            //console.log(chrome.devtools.inspectedWindow.tabId); //equal to 'tabArray[0].id' in background.js
            port.postMessage(JSON.stringify(result));
            i=0;
        }
    });
});

