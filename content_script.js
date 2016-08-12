window.onload = function(){	//画像まで読み込み終わると実行

	var date1 = new Date();
	var before,after;	//計測前後のバッテリーを記憶
//	var timer = 1 * 60000;	//計測する時間(ミリ秒指定)
	var timer = 5000;	//5秒(デバッグ用)

/*	navigator.getBattery().then(function(b){
		console.log(b.level * 100 + "%");	//デバッグ用
		before = b.level * 100;	//計測開始時のバッテリー
	});	*/

	var countup = function(){
		//navigator.getBattery().then(function(b){
		/*	console.log(b.level * 100 + "%");	//デバッグ用
			after = b.level * 100;	//計測終了時のバッテリー
			var result = after - before;	*/
			var date2 = new Date();

			var result = {	//データベースに結果を格納
				url:document.location.href,
				start_date: date1,
				finish_date: date2,
				document_body_clientHeight:getHeight(),
				document_body_scrollWidth:getWidth(),
				html:document.getElementsByTagName('html')[0].innerHTML
			}
			$.ajax({
				url:"https://127.0.0.1:4443/nkjm/result/",
				type:"POST",
				contentType:"application/json",
				data:JSON.stringify(result)
			});

			$(document).ajaxComplete(function(){	//ajax通信が完了すると実行
				chrome.runtime.sendMessage(	//計測終了をbackground.jsに伝える
					{	
						msg: "finished",
					}, function(response){	

					}
				);
			});
		//});
	};

	setTimeout(countup, timer);	//countupをtimer時間後に実行

};

var getHeight = function() {	//ウィンドウサイズを表示
	return(document.body.clientHeight);	//高さ
};

var getWidth = function() {
	return(document.body.scrollWidth);	//幅
}
