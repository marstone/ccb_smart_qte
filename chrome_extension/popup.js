// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


function click(e) {
  chrome.tabs.executeScript(null,
      {code:"document.body.style.backgroundColor='" + e.target.id + "'"});
  window.close();
}

document.addEventListener('DOMContentLoaded', function () {
  var divs = document.querySelectorAll('div');
  for (var i = 0; i < divs.length - 1; i++) {
    divs[i].addEventListener('click', click);
  }

  divs[divs.length - 1].addEventListener('click', function inject(e) {
	  chrome.tabs.executeScript(null,
		{
			code:"(function (d, s, id) { " +
					"var js, fjs = d.getElementsByTagName(s)[0];" +
					"if (d.getElementById(id)) return;" +
					"js = d.createElement(s); js.id = id;" +
					"js.src = 'http://app.marstone.net/StudioWeb/inject.js';" +
					"fjs.parentNode.insertBefore(js, fjs);" +
				 "} (document, 'script', 'ccb_qte'));"
		});
	  window.close();
	});
});
