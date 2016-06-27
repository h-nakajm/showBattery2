var start = function() {
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

            // message passing.(以下はタブの生成完了を待たないため，成功しない！)
            //chrome.tabs.sendMessage(tab.id, {task: '001', msg: 'hello'});

            //var before = new Date();
            //tab.sendMessage(getTask);
            //console.log((new Date() - before));
        }
    );
};

(function() {   //アイコンクリックで測定開始
  //chrome.browserAction.onClicked.addListener(showBattery);
  chrome.browserAction.onClicked.addListener(start);
}) ();

chrome.runtime.onMessage.addListener(   //content_scriptからメッセージを受信すると実行
  function (request, sender, sendResponse) {
    chrome.runtime.sendMessage({msg: "sending..."}, function(response){
        console.log("finished!");
    });
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

