var start = function() {
	var Tab_Id;
	var url_list;
	// stub
	var getNextUrl = function() {
		return 'https://www.google.co.jp';
	}

	var url = getNextUrl();

	/*chrome.runtime.getPackageDirectoryEntry(function(entry) {	//indexファイルの読み込み
		entry.getFile('index.json', {create: false}, function(file_entry) {
			file_entry.file(function(file){
				var reader = new FileReader;
				reader.onload = function(event){	//ファイルのreadが完了すると実行
					url_list = JSON.parse(event.target.result);	//urlのリストを配列に格納
				};
				reader.readAsText(file, 'utf-8');
			});
		});
	});*/	//将来の拡張のための準備

	chrome.tabs.create(
		{url: url},
		function(tab) {
			Tab_Id = tab.id;
		}
	);

	chrome.runtime.onMessage.addListener(   //content_scriptからメッセージを受信すると実行
		function (request, sender, sendResponse) {
			if(request.msg == "sending..."){
				chrome.tabs.sendMessage(Tab_Id, {msg: "sending..."}, function(response){

					console.log("sender: " + sender);
				});
			} else if(request.msg == "finished"){	//結果を表示
				console.log("Energy Consumption: " + request.result + "%");
				console.log("Window Height: " + request.height);
				console.log("Window Width: " + request.width);
				chrome.tabs.query({active: true, currentWindow: true}, function(tabs){	//計測が終了したタブを閉じる
					chrome.tabs.remove(tabs[0].id);
				});
			}
		}
	);
};

(function() {   //アイコンクリックで測定開始
	chrome.browserAction.onClicked.addListener(start);
}) ();


/*(function() {     //まつ本先生のコード
    // stub
    var getNextUrl = function() {
        return 'http://bollywoodindianmovies.com/';
    }

    var url = getNextUrl();

    chrome.tabs.create(
        {url: url},
        function(tab) {
            console.log(tab);
            //waitContentLoad();

            // message passing.
            chrome.tabs.sendMessage(tab.id, {task: '001', msg: 'hello'});

            var before = new Date();
            //tab.sendMessage(getTask);
            console.log((new Date() - before));
        }
    );
}());*/

