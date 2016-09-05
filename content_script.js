var a;
var stopwatch = {};   //タイマーを格納するオブジェクト
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

	stopwatch.onload = new Date();
	var before,after;	//計測前後のバッテリーを記憶
//	var timer = 60 * 60000;	//計測する時間(ミリ秒指定)
	var timer = 5000;	//5秒(デバッグ用)

	var countup = function(){
			var result = after - before;
			stopwatch.finished = new Date();

			var result = {	//データベースに結果を格納
				url:document.location.href,
				document_body_clientHeight:getHeight(),
				document_body_scrollWidth:getWidth(),
				html:document.getElementsByTagName('html')[0].innerHTML,
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
						msg: "finid//shed"
					}, function(response){

					}
				);
			});
	};

	setTimeout(countup, timer);	//countupをtimer時間後に実行

};

var getHeight = function() {	//ウィンドウサイズを表示
	return(document.body.clientHeight);	//高さ
};

var getWidth = function() {
	return(document.body.scrollWidth);	//幅
};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	console.log(request);
	console.log(sender);
	stopwatch.tab_created = new Date(request.tab_created);
});
