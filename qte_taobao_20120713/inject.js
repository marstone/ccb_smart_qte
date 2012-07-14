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
	var js = document.getElementById("tmall_qte");
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

function tmall_qte() {
	var dice = localStorage['dice'];
	if(null == dice)
		dice = localStorage['dice'] = 5000;

	if(dice == 0)
		return;

	if(dice < 100) dice = 100;
	var dice2 = dice / 2;


	var btns = document.getElementsByClassName('award_btn');
	log('btns.length=' + null == btns ? 0 : btns.length);
	if(btns.length > 0 && btns[0].className != 'award_btn award_btn3') {
		var btn = btns[0];
		// log(btn.className);
		log('smash!');
		dispatchMouseEvent(btn, 'mouseover', true, true);
		dispatchMouseEvent(btn, 'click', true, true);
	}

	var rand = Math.floor((Math.random()*dice2)+dice2);

	log('reloading after ' + rand + 'ms.');
	setTimeout(function() { window.location.reload(); }, rand);
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
	log(localStorage['dice']); 
	setTimeout(vol_cat, 5000); 
}

(function init() {
	setTimeout(tmall_qte, 1500);
	setTimeout(qte_status, 500);
})();