var showBattery = function(){

	var before,after;
	var timer = 5000;

	navigator.getBattery().then(function(b){
		console.log(b.level * 100 + "%");
		before = b.level * 100;
	});

	var countup = function(){
　	navigator.getBattery().then(function(b){
			console.log(b.level * 100 + "%");
			after = b.level * 100;
			console.log("The difference is " + (after - before) + "%.");
		});
	}
	setTimeout(countup, timer);

};
