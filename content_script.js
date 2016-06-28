var showBattery = function(){

	var before,after;	//計測前後のバッテリーを記憶
//	var timer = 1 * 60000;	//計測する時間(ミリ秒指定)
	var timer = 5000;	//5秒

	navigator.getBattery().then(function(b){
		console.log(b.level * 100 + "%");
		before = b.level * 100;	//計測開始時のバッテリー
	});

	var countup = function(){
		navigator.getBattery().then(function(b){
			console.log(b.level * 100 + "%");
			after = b.level * 100;	//計測終了時のバッテリー
			alert("The difference is " + (after - before) + "%.");	//計測結果をalertで表示
		});
	};

	setTimeout(countup, timer);	//countupをtimer時間後に実行

};

chrome.runtime.sendMessage({msg: "sending..."}, function(response){	//background.jsにメッセージを送信
	console.log("aaa");
	if(response){
		alert(response);
	}
});


chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse){
	    console.log('received!!');
	    //showBattery();
	}
);
