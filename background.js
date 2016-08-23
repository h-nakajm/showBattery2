var UrlList;
var Index = 1;	//UrlList走査用のGlobal variable(インクリメントのみ)
//var tab_created;
var start = function() {

	chrome.runtime.getPackageDirectoryEntry(function(entry) {	//indexファイルの読み込み
		//entry.getFile('index.json', {create: false}, function(file_entry) {
		entry.getFile('index2.json', {create: false}, function(file_entry) {
			file_entry.file(function(file){
				var reader = new FileReader();
				reader.onload = function(event){	//ファイルのreadが完了すると実行
					UrlList = JSON.parse(event.target.result);	//urlのリストを配列に格納
					chrome.tabs.create(
						{url: UrlList[0]},
						function xxx(tab) {
							var t = new Date();	
							console.log(t);
							var i = 5;
							setTimeout(function(){	
								chrome.tabs.sendMessage(tab.id, {tab_created: t.toString(), i:i, j:new Date()}, function(){})
							}, 1000)
						}
					);
				};
				reader.readAsText(file, 'utf-8');
			});
		});
	});

};

chrome.runtime.onMessage.addListener(   //content_scriptからメッセージを受信すると実行
	function (request, sender, sendResponse) {
		if(request.msg == "finished"){	//結果を表示

			chrome.tabs.remove(sender.tab.id);	//計測が終了したタブを閉じる

			if(UrlList.length > Index){
				chrome.tabs.create({url: UrlList[Index]});	//次のタブを生成	
				Index++;
			} else {	//Indexを1に戻す
				Index = 1;
			}
		}
	}
);

(function() {   //アイコンクリックで測定開始
	chrome.browserAction.onClicked.addListener(start);
}) ();

