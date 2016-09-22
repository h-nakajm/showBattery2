var a;
var stopwatch = {};   //タイマーを格納するオブジェクト
var har;
//var date0;
function nkjm2(){
	stopwatch.start = new Date();
	console.log("date0 defined");
}

nkjm2();
document.addEventListener("DOMContentLoaded", function domcl(event) {
	stopwatch.dom_content_loaded = new Date();
});

//document.addEventListener("loaded", function loaded(event){
window.onload = function nkjm(){	//画像まで読み込み終わると実行

	var count = 0;
	while($('img').length > count) {
		if($('img').eq(count).css('font-family').match(/nakajm/)) {
//			console.log('sachio');
		}
		count++;
	}

	chrome.runtime.sendMessage(	//計測開始時に，devtoolsにgetHARを開始させる
		{
			msg: "getHAR"
		}, function(response){

		}
	);

	stopwatch.onload = new Date();

//	var timer = 60 * 60000;	//計測する時間(ミリ秒指定)
	var timer = 5000;	//5秒(デバッグ用)

	/*var countup = function(){
			stopwatch.finish_waiting = new Date();

			var result = {	//データベースに結果を格納
				url:document.location.href,
				document_body_clientHeight:getHeight(),
				document_body_scrollWidth:getWidth(),
				html:document.getElementsByTagName('html')[0].innerHTML,
				har: har,
				stopwatch: stopwatch
			};
			$.ajax({
				url:"https://127.0.0.1:4443/nkjm/result/",
				type:"POST",
				contentType:"application/json",
				data:JSON.stringify(result)
			});
			a = stopwatch;

			console.log(stopwatch.start.toISOString());
			console.log(stopwatch.dom_content_loaded.toISOString());
			console.log(stopwatch.onload.toISOString());
			console.log(stopwatch.finished.toISOString());
			$(document).ajaxComplete(function(){	//ajax通信が完了すると実行
				chrome.runtime.sendMessage(	//計測終了をbackground.jsに伝える
					{
						msg: "finished"
					}, function(response){

					}
				);
			});
	};

	setTimeout(countup, timer);	//countupをtimer時間後に実行*/

};

var getHeight = function() {	//ウィンドウサイズを表示
	return(document.body.clientHeight);	//高さ
};

var getWidth = function() {
	return(document.body.scrollWidth);	//幅
};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	//console.log(JSON.parse(request));
	console.log(request.tab_created);
	console.log(sender);

	if(request.tab_created != null) {
		stopwatch.tab_created = new Date(request.tab_created);
	} else {
		//	var timer = 60 * 60000;	//計測する時間(ミリ秒指定)
		var timer = 5000;	//5秒(デバッグ用)


		// getHARが終わったら計測開始
		har = JSON.parse(request);
		stopwatch.start_waiting = new Date();

		var countup = function(){
			stopwatch.finish_waiting = new Date();

			var result = {	//データベースに結果を格納
				url:document.location.href,
				document_body_clientHeight:getHeight(),
				document_body_scrollWidth:getWidth(),
				html:document.getElementsByTagName('html')[0].innerHTML,
				har: har,
				stopwatch: stopwatch
			};
			$.ajax({
				url:"https://127.0.0.1:4443/nkjm/result/",
				type:"POST",
				contentType:"application/json",
				data:JSON.stringify(result)
			});
			a = stopwatch;

			console.log(stopwatch.start.toISOString());
			console.log(stopwatch.dom_content_loaded.toISOString());
			console.log(stopwatch.onload.toISOString());
			console.log(stopwatch.finish_waiting.toISOString());
			$(document).ajaxComplete(function(){	//ajax通信が完了すると実行
				chrome.runtime.sendMessage(	//計測終了をbackground.jsに伝える
					{
						msg: "finished"
					}, function(response){

					}
				);
			});
		};

		setTimeout(countup, timer);	//countupをtimer時間後に実行
	}
});
