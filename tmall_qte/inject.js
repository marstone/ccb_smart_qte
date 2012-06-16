<<<<<<< HEAD
// tmall qte, by marstone, 2012/06/15

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
	// localStorage["dice"] = 1;
	// log('starting tmall qte...' + localStorage['dice']);

	var dice = localStorage['dice'];
	if(null == dice)
		dice = localStorage['dice'] = 1000;

	if(dice == 0)
		return;

	if(dice < 100) dice = 100;
	var dice2 = dice / 2;

	/* version before 20120618
	var divs = document.getElementsByTagName('div');
	for(var i = 0; i < divs.length; i++) {
		var an = divs[i];
		if(an.className == 'vol-btn') {
			dispatchMouseEvent(an.nextSibing, 'mouseover', true, true);
			dispatchMouseEvent(an.nextSibing, 'click', true, true);
			break;
		}
	}
	*/

	var btn = document.getElementsByClassName('vol-btn')[0];
	// log(btn.className);
	if(btn.className != 'vol-btn vol-btn-disable') {
		log('smash!');
		dispatchMouseEvent(btn, 'mouseover', true, true);
		dispatchMouseEvent(btn, 'click', true, true);
	}

	var rand = Math.floor((Math.random()*dice2)+dice2);
	timer = setTimeout(tmall_qte, rand);

	/* version before 20120618
	if(dice != 0 && null == timer) {
		timer = setTimeout(tmall_close, rand);
	}
	*/
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


function vol_cat() { 

	var catBodies = document.getElementsByClassName('vol-cat-body');
	var found = false;
	if(null != catBodies) {
		for(var x = 0; x < catBodies.length; x++) {
			if(found)
				break;
			var catBody = catBodies[x];
			if(catBody.style.display == 'none')
				continue;

			for(var y = 0; y < catBody.childNodes.length; y++ ) {

				if(catBody.childNodes[y].className == 'vol-cat'){
					var cat = catBody.childNodes[y];
					if(null != catBody && null != cat) {

						log('cat found! dont run!');
						dispatchMouseEvent(cat, 'mouseover', true, true);
						dispatchMouseEvent(cat, 'click', true, true);
						found = true;
						break;
					}
				}
            }
		}
	}
	setTimeout(vol_cat, 800); 
}

function qte_status() {
	log(localStorage['dice']); 
	setTimeout(vol_cat, 5000); 
}

(function init() {
	setTimeout(vol_cat, 500);
	setTimeout(tmall_qte, 500);
	setTimeout(qte_status, 500);
})();


=======
// tmall qte, by marstone, 2012/06/15

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
	// localStorage["dice"] = 1;
	log('starting tmall qte...' + localStorage['dice']);

	var dice = localStorage['dice'];
	if(null == dice)
		dice = localStorage['dice'] = 1000;

	if(dice == 0)
		return;

	if(dice < 100) dice = 100;
	var dice2 = dice / 2;

	
	var divs = document.getElementsByTagName('div');
	for(var i = 0; i < divs.length; i++) {
		var an = divs[i];
		if(an.className == 'vol-btn') {
			dispatchMouseEvent(an, 'click', true, true);
			break;
		}
	}

	var rand = Math.floor((Math.random()*dice2)+dice2);

	if(dice != 0 && null == timer) {
		timer = setTimeout(tmall_close, rand);
	}
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


function vol_cat() { 

	var catBody = document.getElementById('J_VolCatBody');
	var cat = document.getElementById('J_VolCat');
	if(null != catBody && null != cat) {
		if(catBody.style.display != 'none') {
			log('cat found! dont run!');
			dispatchMouseEvent(cat, 'click', true, true);
		}
	}
	setTimeout(vol_cat, 150); 
}

function qte_status() {
	log(localStorage['dice']); 
	setTimeout(vol_cat, 5000); 
}

(function init() {
	setTimeout(vol_cat, 500);
	setTimeout(tmall_qte, 500);
	setTimeout(qte_status, 500);
})();


>>>>>>> change vol-cat 100ms to 150ms
