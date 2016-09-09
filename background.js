var UrlList;
var TabId = 0;
var WaitTabCreate = 3000;
var Index = 1;	//UrlList走査用のGlobal variable(インクリメントのみ)
var loadIndexes = function() {

	chrome.runtime.getPackageDirectoryEntry(function(entry) {	//indexファイルの読み込み
		entry.getFile('index2.json', {create: false}, function(file_entry) {
			file_entry.file(function(file){
				var reader = new FileReader();
				reader.onload = startMesurement;	//ファイルのreadが完了すると実行
				reader.readAsText(file, 'utf-8');
			});
		});
	});

};

var startMesurement = function(event){
	UrlList = JSON.parse(event.target.result);	//urlのリストを配列に格納
//	chrome.tabs.create({url: "about:blank"}, function(tab){
//	chrome.tabs.create({url: UrlList[0]}, function(tab){

	chrome.tabs.query(
        {currentWindow: true, active: true},
        function (tabArray) {
            console.log(tabArray[0].id);
            TabId = tabArray[0].id;
            chrome.tabs.update(TabId, {url: UrlList[0]}, function(newTab){
                setTimeout(function(){

				}, 1000);

				TabId = newTab.id;
				setTimeout(function(){

				}, WaitTabCreate);
            });
        }
    );

	// chrome.tabs.update({url: UrlList[0]}, function(tab){
	// 	setTimeout(function(){

	// 	}, 1000);

	// 	TabId = tab.id;
	// 	setTimeout(function(){

	// 	}, WaitTabCreate);
	// });
};

var mesureSpecifiedIndex = function(si){
	chrome.tabs.update(TabId, {url: UrlList[si]}, function(tab){
		var tab_created = new Date();
		console.log(tab_created.toISOString());
		chrome.tabs.sendMessage(TabId, {tab_created: tab_created.toString()}, function(){});
	});
};

chrome.runtime.onMessage.addListener(   //content_scriptからメッセージを受信すると実行
	function (request, sender, sendResponse) {
		if(request.msg == "finished"){	//結果を表示
			if(UrlList.length > Index){
				//少し待つべきかも
				mesureSpecifiedIndex(Index);
				Index++;
			} else {	//Indexを1に戻す
				Index = 1;
			}
		}
	}
);

(function() {   //アイコンクリックで測定開始
	chrome.browserAction.onClicked.addListener(loadIndexes);
}) ();

