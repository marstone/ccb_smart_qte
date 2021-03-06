// ccb qte, by marstone, 2012/05/29

function log(m) { 
	var t = new Date();
	console.log('[' + t.format('hh:mm:ss S') + ']' + m); 
}

function qte_option(key) {
	var js = document.getElementById("ccb_qte");
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

function ccb_qte() {
	log('start injecting...');

	if("undefined" === typeof $) {
		(function (d, s, id) {
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) return;
			js = d.createElement(s); js.id = id;
			js.src = 'http://app.marstone.net/StudioWeb/jquery-1.5.1.js';
			js.onload = injected;
			fjs.parentNode.insertBefore(js, fjs);
		} (document, 'script', 'jquery_1.5'));
	}
	else
		injected();
}
// DOM 2 Events
function dispatchMouseEvent(target, var_args) {
  var e = document.createEvent("MouseEvents");
  // If you need clientX, clientY, etc., you can call
  // initMouseEvent instead of initEvent
  e.initEvent.apply(e, Array.prototype.slice.call(arguments, 1));
  target.dispatchEvent(e);
};


var questionKeyword = ["Smart属于哪个汽车品牌", "您现在要参加什么活动", "中国的首都在哪里", "2012年夏季奥运会在哪里举办","现在是哪一年"];
var answerKeyword = ["奔驰","我要参加建行团购活动","北京","伦敦","2012"];

function findQuestionIndex(){

	var spans=$("span");

	for(keywordIndex=0;keywordIndex<questionKeyword.length;keywordIndex++){
		var q = questionKeyword[keywordIndex];
		for(var i=0;i<spans.length;i++){
			if(($(spans[i]).text()).indexOf(q)!=-1)
				return keywordIndex;
		}
	}
	return -1;
}

function injected() {
	log('jquery injected.');
	

	var og = document.getElementById("onGoing");
	if(null == og)
		return;
	
	var vcs = document.getElementsByName("verificationCode");
	if(null == vcs || vcs.length == 0)
		return;
	vcs[0].value = qte_option('verify');
	
	
	if(qte_option("autopost") == "true") {
		var index= findQuestionIndex();
		if (index!=-1)
		{
			var answer=answerKeyword[index];
			var inputs = document.getElementsByTagName("input");
			for(var i = 0; i < inputs.length; i++)
			{
				var input = inputs[i];
				if(input.type == "submit" && input.name=="choiceAnswer" && null != input.value)
				{
					
					if(input.value.indexOf(answer) != -1)
						dispatchMouseEvent(input, 'click', true, true);
				}
			}
		}

		
	}
//////////////////
// 2012/06/05, strategy changed by ccb. we guess.
	return;
//////////////////

	var src = "test src, not implemented.";
	var img = document.getElementById('jcaptcha');
	//log(img.width + "x" + img.height);
	//var base64 = img2base64(img);
	//log(base64);
	
	var button = document.createElement('input');
	button.type = "button";
	button.value = "captcha_post";
	button.onclick = function() { captcha_post(); };

	
	var br = document.createElement('input');
	br.type = "button";
	br.value = "get_qte_code";
	br.onclick = function() { get_qte_code(); };

	$(img).before(button);
	$(img).before(br);
	
	log(qte_option("autoload"));
	if(qte_option("autoload") == "true")
		captcha_post();
	
	if(qte_option("autofill") == "true")
		get_qte_code();
}

function qte_server() {
	var server = qte_option("server");
	if(null == server) server = "202.120.3.160:8080";
	return server;
}

function get_captcha()
{
	var captcha = document.getElementById('jcaptcha');
	if(null != captcha)
		return captcha;
	var form = document.getElementsByTagName("form")[0];
	
}

function captcha_post(){
	var iframe = create_iframe("ccb_qte_post");
    var idoc = iframe.contentDocument || iframe.contentWindow.document;

	var iform = idoc.createElement("form");
	iform.action = "http://" + qte_server() + "/ccb/smart/image";
	iform.method = "post";

	var iinput = idoc.createElement("input");
	iinput.id = iinput.name = "src";
	iform.appendChild(iinput);

	var iw = idoc.createElement("input");
	iw.id = iw.name = "width";
	iform.appendChild(iw);
	var ih = idoc.createElement("input");
	ih.id = ih.name = "height";
	iform.appendChild(ih);

	idoc.body.appendChild(iform);

	var img = get_captcha();
	var base64 = img2base64(img);
	iw.value = img.width;
	ih.value = img.height;
	iinput.value = base64;
	// console.log(base64);
	console.log("posting captcha to server...");
	iform.submit();
}

function create_iframe(id) {
	var iframe = document.getElementById(id);
	if(null != iframe) $(iframe).remove();
	iframe = document.createElement("iframe");
	iframe.id = id;
	iframe.style.display = "none";
	document.body.appendChild(iframe);
    var idoc = iframe.contentDocument || iframe.contentWindow.document;
	idoc.body.innerHTML = '';
	return iframe;
}

function get_qte_code() {
	log('getting qte code...');
	var id = "ccb_qte_code";
	var js = document.getElementById(id);
	if(null == js) {
		js = document.createElement("script");
		js.id = id;
		var fjs = document.getElementsByTagName("script")[0];
        fjs.parentNode.insertBefore(js, fjs);
	}
	js.src = "http://" + qte_server() + "/ccb/smart/code?callback=qte_code&rnd=" +  (Math.random() * 999);
}

function qte_code(txt) {
	log('qte code got.');
	if(null != txt) {
		var input = document.getElementsByName("jcaptcha")[0];
		input.value = txt;
		if(qte_option("autopost") == "true") {
			var user = document.getElementById('userName');
			if(null != user)
				user.value = qte_option('verify');
			// do something.
		}
		log(txt);
	}
	else
		log('null!');
	setTimeout(get_qte_code, 10);
}



function img2base64(img) {
    // Create an empty canvas element
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    // Copy the image contents to the canvas
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    // Get the data-URL formatted image
    // Firefox supports PNG and JPEG. You could check img.src to
    // guess the original format, but be aware the using "image/jpg"
    // will re-encode the image.
    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

Date.prototype.format = function(format) //author: meizz
{
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

ccb_qte();