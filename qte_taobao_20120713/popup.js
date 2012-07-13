// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


function click(e) {

	var code = "(function (d, s, id) { " +
			"var js, fjs = d.getElementsByTagName(s)[0];" +
			"var sc = d.getElementById(id);" +
			"if (sc) sc.parentNode.removeChild(sc);" +
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

	chrome.tabs.executeScript(null, {
		code: code
	});

	code = "localStorage['dice']=" + e.target.innerHTML + ";console.log(localStorage['dice']);";

	// code = "console.log('" + e.target.innerHTML + "');";
	chrome.tabs.executeScript(null,
		{code: code}
	);
	window.close();
}

document.addEventListener('DOMContentLoaded', function () {
	var divs = document.querySelectorAll('div');
	for (var i = 0; i < divs.length; i++) {
		divs[i].addEventListener('click', click);
	}
});
