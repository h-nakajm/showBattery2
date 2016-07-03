var Tab_Id;

var start = function() {
	// stub
	var getNextUrl = function() {
		return 'https://www.google.co.jp';
	}

	var url = getNextUrl();

	chrome.runtime.getPackageDirectoryEntry(function(entry) {	//indexファイルの読み込み
		entry.getFile('index.json', {create: false}, function(file_entry) {
			file_entry.file(function(file){
				var reader = new FileReader;
				reader.onload = function(event){
					console.log(event.target.result);	//ファイルの中身を表示
				};
				reader.readAsText(file, 'utf-8');
			});
		});
	})

	chrome.tabs.create(
		{url: url},
		function(tab) {
			//console.log(tab);
			Tab_Id = tab.id;
			//waitContentLoad();

			// message passing.(以下はタブの生成完了を待たないため，成功しない！)
			//chrome.tabs.sendMessage(tab.id, {task: '001', msg: 'hello'});

			//var before = new Date();
			//tab.sendMessage(getTask);
			//console.log((new Date() - before));
		}
	);
};

(function() {   //アイコンクリックで測定開始
	chrome.browserAction.onClicked.addListener(start);
}) ();

chrome.runtime.onMessage.addListener(   //content_scriptからメッセージを受信すると実行
	function (request, sender, sendResponse) {
		if(request.msg == "sending..."){
			chrome.tabs.sendMessage(Tab_Id, {msg: "sending..."}, function(response){
				console.log("finished!");
			});
		} else if(request.msg == "finished"){
			console.log("Energy Consumption: " + request.result + "%");
			console.log("Window Height: " + request.height);
			console.log("Window Width: " + request.width);
			chrome.tabs.remove(Tab_Id);
		}
	}
);



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
