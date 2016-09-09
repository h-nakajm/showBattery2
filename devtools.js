var port = chrome.runtime.connect({name: 'devtools'});

port.onMessage.addListener(function(msg){
    
});

var i=0;
var entry_length = 0;

chrome.devtools.network.onRequestFinished.addListener(function(request){
	if(request.serverIPAddress !== "127.0.0.1") {
		i++;
		chrome.devtools.network.getHAR(function xxx(result){
			entry_length = result.entries.length;
			if (i === result.entries.length) {
				console.log(result);
				//console.log(chrome.devtools.inspectedWindow.tabId); //equal to 'tabArray[0].id' in background.js
				port.postMessage(JSON.stringify(result));
				i=0;
			}
		});
		console.log(i);
		console.log(entry_length);
		console.log(request.serverIPAddress);
	}
});

