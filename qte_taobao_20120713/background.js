function inject() {

	var code = "(function (d, s, id) { " +
				"var js, fjs = d.getElementsByTagName(s)[0];" +
				"if (d.getElementById(id)) return;" +
				"js = d.createElement(s); js.id = id;" +
				"js.src = '" + chrome.extension.getURL("inject.js") + 
					"?autoload=" + (localStorage["autoload"] == "enabled") + 
					"&autofill=" + (localStorage["autofill"] == "enabled") + 
					"&autopost=" + (localStorage["autopost"] == "enabled") + 
					"&verify=" + (localStorage["verify"]) + 
					"&server=" + (localStorage["server"]) + 
					"&rnd=" + Math.random() * 999 +
					"';" + 
				"fjs.parentNode.insertBefore(js, fjs);" +
			 "} (document, 'script', 'tmall_qte'));";

	// { s.parentNode.removeChild(s); };

	chrome.tabs.executeScript(null, {
		code: code
	});
}

function init() {
	chrome.tabs.onUpdated.addListener(function( tabId , info, tab ) {
		if ( info.status == "complete" ) {
			// your code ...
			inject();
			console.log(tabId);
			console.log(info);
			console.log(tab);
		}

		var injectUrl = chrome.extension.getURL("inject.js");
		console.log(injectUrl);
	});
}

init();