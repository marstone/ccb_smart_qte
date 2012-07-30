// taobao qte, by marstone, 2012/07/15

function log(m) { 
	var t = new Date();
	console.log('[' + t.format('hh:mm:ss S') + ']' + m); 
}

//author: meizz
Date.prototype.format = function(format) {
	var o = {
	"M+" : this.getMonth()+1, //month
	"d+" : this.getDate(), //day
	"h+" : this.getHours(), //hour
	"m+" : this.getMinutes(), //minute
	"s+" : this.getSeconds(), //second
	"q+" : Math.floor((this.getMonth()+3)/3), //quarter
	"S" : this.getMilliseconds() //millisecond
	}
	if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
	(this.getFullYear()+"").substr(4 - RegExp.$1.length));
	for(var k in o)if(new RegExp("("+ k +")").test(format))
	format = format.replace(RegExp.$1,
	RegExp.$1.length==1 ? o[k] :
	("00"+ o[k]).substr((""+ o[k]).length));
	return format;
}


var timer = null;

function qte_option(key) {
	var js = document.getElementById("qte_script");
	if(null == js) return null;
	var map = {};
	var searches = js.src.split("?");
	if(searches.length > 1)
	{	
		var parts = searches[1].split("&");
		for (var i = 0; i < parts.length; i++) {
			var component = parts[i].split("=");
			map[decodeURIComponent(component[0])] = decodeURIComponent(component[1]);
		}
	}
	return map[key];
}

function qte_events() {
	// console.log('injected');

	var dice = localStorage['dice'];
	if(null == dice)
		dice = localStorage['dice'] = 1000;

	if(dice == 0)
		return;

	if(dice < 100) dice = 100;


	var d = window.frames[0].document;
	var f = d.getElementById('fromStationText');
	var t = d.getElementById('toStationText');
	
	var button = d.getElementById('submitQuery');
	
	log(f.className);
	if(null != button && f.className == "input_20txt" && t.className == "input_20txt" &&
		f.value != d.value) {
		
		button.className = 'research_u';
		dispatchMouseEvent(button, 'click', true, true);
		button.className = 'research_u';
		
		try {
			var cell = d.getElementsByTagName('table')[6].children[0].children[1].children[9];
			var x = cell.innerText;
			log("status=" + x);
			if(x != '无')
				alert(x);
			
			//var y = qte_echo(x);
			//log(y);
			
			log(chrome);
			
			// Create a simple text notification:
			var notification = webkitNotifications.createNotification(
  				// '48.png',  // icon url - can be relative
				'Hello!',  // notification title		
				'Lorem ipsum...'  // notification body text
			);
			// Or create an HTML notification:
			// var notification = webkitNotifications.createHTMLNotification(
			//  'notification.html'  // html url - can be relative
			//);
			// Then show the notification.
			notification.show();
				
		}
		catch(e) {log(e);}
	}

	setTimeout(function() { qte_events(); }, dice);
}

function tmall_close() {

	var anchors = document.getElementsByTagName('a');
	for(var i = 0; i < anchors.length; i++) {
		var an = anchors[i];
		if(an.className == 'vol-dialog-close') {
			dispatchMouseEvent(an, 'click', true, true);
			break;
		}
	}
	
	var rand = Math.floor((Math.random()*100)+100);
	timer = null;
	setTimeout(tmall_qte, rand);
}


// DOM 2 Events
function dispatchMouseEvent(target, var_args) {
  var e = document.createEvent("MouseEvents");
  // If you need clientX, clientY, etc., you can call
  // initMouseEvent instead of initEvent
  e.initEvent.apply(e, Array.prototype.slice.call(arguments, 1));
  target.dispatchEvent(e);
};

function qte_status() {
	log("localStorage['dice']=" + localStorage['dice']); 
}

(function init() {
	setTimeout(qte_events, 1500);
	setTimeout(qte_status, 500);
})();