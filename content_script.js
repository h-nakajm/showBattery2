var tab_id;
//var date = new Date();

/*chrome.runtime.sendMessage(
		{	msg: "sending...",
			year: date.getFullYear(),
			month: date.getMonth()+1,
			day: date.getDate(),
			hour: date.getHours(),
			minute: date.getMinutes(),
			second: date.getSeconds(),
		}, function(response){	//background.jsにメッセージを送信
});	*/

/*var getTabId = function(){
	var tab_id;
	chrome.tabs.getCurrent(function(tab){
		tab_id = tab.id;
	});
	return tab_id;
};*/

window.onload = function(){	//background.jsからメッセージを受信すると実行開始

	var date1 = new Date();
	var before,after;	//計測前後のバッテリーを記憶
//	var timer = 1 * 60000;	//計測する時間(ミリ秒指定)
	var timer = 5000;	//5秒(デバッグ用)

	navigator.getBattery().then(function(b){
		console.log(b.level * 100 + "%");	//デバッグ用
		before = b.level * 100;	//計測開始時のバッテリー
	});

	var countup = function(){
		navigator.getBattery().then(function(b){
			console.log(b.level * 100 + "%");	//デバッグ用
			after = b.level * 100;	//計測終了時のバッテリー
			var result = after - before;
			var date2 = new Date();
			chrome.runtime.sendMessage(			//計測結果をメッセージで送信
				{	
					msg: "finished",
					year1: date1.getFullYear(),
					year2: date2.getFullYear(),
					month1: date1.getMonth()+1,
					month2: date2.getMonth()+1,
					day1: date1.getDate(),
					day2: date2.getDate(),
					hour1: date1.getHours(),
					hour2: date2.getHours(),
					minute1: date1.getMinutes(),
					minute2: date2.getMinutes(),
					second1: date1.getSeconds(),
					second2: date2.getSeconds(),
					result: result,
					height: getHeight(),
					width: getWidth(),
				}, function(response){	//mongoDBに計測結果を格納
					var result = {
						url:document.location.href,
						date: new Date(),
						element:"aaaaa"
					}
					$.ajax({
						url:"http://127.0.0.1:8080/nkjm/result/",
						type:"POST",
						contentType:"application/json",
						data:JSON.stringify(result)
					})
				}
			);
		});
	};

	setTimeout(countup, timer);	//countupをtimer時間後に実行

};

/*chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse){
	    console.log('received!!');
	    showBattery();
	}
);	*/

var getHeight = function() {	//ウィンドウサイズを表示
	return(document.body.clientHeight);	//高さ
};

var getWidth = function() {
	return(document.body.scrollWidth);	//幅
}
