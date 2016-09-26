var a;
var stopwatch = {};   //タイマーを格納するオブジェクト
var window_size = {};
var har;
var origin;
var experiment_type = 'labeled';
//var date0;
function nkjm2(){
	stopwatch.start = new Date();
	console.log("date0 defined");
	chrome.runtime.sendMessage(	//content_scriptの実行開始をbackgroundに伝える
		{
			msg: "content_start"
		}, function(response){

		}
	);
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

	// labeledな広告を選択，DBに書き込み
	$('*').each(function(i, d) {
		if ($(d).css('font-family').match(/__ELEMENT__/)) {
			console.log(d);
			var ads = {};
			ads.location = document.location.href,
			ads.url = d.src;
			ads.width = d.width;
			ads.height = d.height;
			ads.experiment_type = experiment_type;
			ads.origin = origin;
			$.ajax({
				url:"https://192.168.146.114:4443/nkjm/element_blocked/",
				type:"POST",
				contentType:"application/json",
				data:JSON.stringify(ads)
			});
		}
	});

};


// windowsizeを取得する関数群
// 幅

var get_screen_width = function() {
	return(screen.width);
};

var get_screen_availWidth = function() {
	return(screen.availWidth);
};

var get_window_innerWidth = function() {
	return(window.innerWidth);
};

var get_window_outerWidth = function() {
	return(window.outerWidth);
};

var get_document_body_clientWidth = function() {
	return(document.body.clientWidth);
};

var get_document_body_offsetWidth = function() {
	return(document.body.offsetWidth);
};

var get_document_body_scrollWidth = function() {
	return(document.body.scrollWidth);
};

var get_document_documentElement_clientWidth = function() {
	return(document.documentElement.clientWidth);
};

var get_document_documentElement_offsetWidth = function() {
	return(document.documentElement.offsetWidth);
};

var get_document_documentElement_scrollWidth = function() {
	return(document.documentElement_scrollWidth);
};

// 高さ

var get_screen_height = function() {
	return(screen.height);
};

var get_screen_availHeight = function() {
	return(screen.availHeight);
};

var get_window_innerHeight = function() {
	return(window.innerHeight);
};

var get_window_outerHeight = function() {
	return(window.outerHeight);
};

var get_document_body_clientHeight = function() {
	return(document.body.clientHeight);
};

var get_document_body_offsetHeight = function() {
	return(document.body.offsetHeight);
};

var get_document_body_scrollHeight = function() {
	return(document.body.scrollHeight);
};

var get_document_documentElement_clientHeight = function() {
	return(document.documentElement_clientHeight);
};

var get_document_documentElement_offsetHeight = function() {
	return(document.documentElement .offsetHeight);
};

var get_document_documentElement_scrollHeight = function() {
	return(document.documentElement .scrollHeight);
};


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	//console.log(JSON.parse(request));
	console.log(request.tab_created);
	console.log(sender);

	if(request.tab_created != null) {
		console.log('tab_created: ' + request.tab_created);
		stopwatch.tab_created = new Date(request.tab_created);
		origin = request.origin;
		console.log('origin: ' + origin);
	} else {
		var timer = 10000;	//計測する時間(ミリ秒指定,10秒)
		//var timer = 5000;	//5秒(デバッグ用)
		var interval = 10000;  //10秒(計測毎の待ち時間)

		var mesurement = function(){


			// getHARが終わったら計測開始
			har = JSON.parse(request);
			stopwatch.start_waiting = new Date();

			var countup = function(){
				stopwatch.finish_waiting = new Date();

			    window_size.scren_width = get_screen_width();
			    window_size.screen_availWidth = get_screen_availWidth();
			    window_size.window_innerWidth = get_window_innerWidth();
			    window_size.window_outerWidth = get_window_outerWidth();
			    window_size.document_body_clientWidth = get_document_body_clientWidth();
			    window_size.document_body_offsetWidth = get_document_body_offsetWidth();
			    window_size.document_body_scrollWidth = get_document_body_scrollWidth();
				window_size.document_documentElement_clientWidth = get_document_documentElement_clientWidth();
				window_size.document_documentElement_offsetWidth = get_document_documentElement_offsetWidth();
				window_size.document_documentElement_scrollWidth = get_document_documentElement_scrollWidth();

			    window_size.screen_height = get_screen_height();
			    window_size.screen_availHeight = get_screen_availHeight();
			    window_size.window_innerHeight = get_window_innerHeight();
			    window_size.window_outerHeight = get_window_outerHeight();
			    window_size.document_body_clientHeight = get_document_body_clientHeight();
			    window_size.document_body_offsetHeight = get_document_body_offsetHeight();
			    window_size.document_body_scrollHeight = get_document_body_scrollHeight();
				window_size.document_documentElement_clientHeight = get_document_documentElement_clientHeight();
				window_size.document_documentElement_offsetHeight = get_document_documentElement_offsetHeight();
				window_size.document_documentElement_scrollHeight = get_document_documentElement_scrollHeight();

				var result = {	//データベースに結果を格納
					origin:origin,
					url:document.location.href,
					html:document.getElementsByTagName('html')[0].innerHTML,
					experiment_type: experiment_type,
					har: har,
					stopwatch: stopwatch,
					window_size: window_size
				};
				console.log(result.origin);
				$.ajax({
					url:"https://192.168.146.114:4443/nkjm/result/",
					type:"POST",
					contentType:"application/json",
					data:JSON.stringify(result)
				});
				a = stopwatch;

				console.log(stopwatch.start.toISOString());
				console.log(stopwatch.tab_created.toISOString());
				console.log(stopwatch.dom_content_loaded.toISOString());
				console.log(stopwatch.onload.toISOString());
				console.log(stopwatch.finish_waiting.toISOString());
				$(document).ajaxComplete(function(){	//ajax通信が完了すると実行
					function each_waiting() {
						chrome.runtime.sendMessage(	//計測終了をbackground.jsに伝える
							{
								msg: "finished"
							}, function(response){

							}
						);
					}

				});
			};

			setTimeout(countup, interval);	//countupをinterval時間後に実行

		};

		setTimeout(mesurement, timer);	//mesurementをtimer時間後に実行
	}
});
