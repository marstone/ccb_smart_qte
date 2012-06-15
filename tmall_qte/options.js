
function checkChanged(event) {
  var key = event.target.id;
  var checked = event.target.checked;
  if (checked) {
    localStorage.setItem(key, "enabled");
  } else {
    localStorage.setItem(key, "disabled");
  }
}

function textChanged(event) {
  var key = event.target.id;
  var value = event.target.value;
  localStorage.setItem(key, value);
}

function showOptions() {
  var autoload = document.getElementById("autoload");
  autoload.checked = localStorage["autoload"] == "enabled";
  autoload.onchange = checkChanged;

  var autopost = document.getElementById("autopost");
  autopost.checked = localStorage["autopost"] == "enabled";
  autopost.onchange = checkChanged;
  
  var autofill = document.getElementById("autofill");
  autofill.checked = localStorage["autofill"] == "enabled";
  autofill.onchange = checkChanged;

  var verify = document.getElementById("verify");
  if(null == localStorage["verify"]) localStorage["verify"] = "plz fill ur own.";
  verify.value = localStorage["verify"];
  verify.onchange = textChanged;

  var server = document.getElementById("server");
  if(null == localStorage["server"]) localStorage["server"] = "202.120.3.160:8080";
  server.value = localStorage["server"];
  server.onchange = textChanged;

}

document.addEventListener('DOMContentLoaded', showOptions);
document.addEventListener('focus', showOptions);