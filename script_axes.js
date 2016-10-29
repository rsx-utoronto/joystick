var haveEvents = 'ongamepadconnected' in window; 
var controller = null;

function connecthandler(e) {
  addgamepad(e.gamepad);
}

function addgamepad(gamepad) {
  controller = gamepad;
  requestAnimationFrame(updateStatus);
}

function disconnecthandler(e) {
  controller = null;
}

function updateStatus() {
  if (!haveEvents) {
    scangamepads();
  }
	
  requestAnimationFrame(updateStatus);
}

function scangamepads() {
  var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
  
  if (gamepads[0]) {
	  controller = gamepads[0];
	  console.log(gamepads[0].axes);
  }
}

console.log("Running scriptExample.js");

window.addEventListener("gamepadconnected", connecthandler);
window.addEventListener("gamepaddisconnected", disconnecthandler);

if (controller == null) {
  setInterval(scangamepads, 500);
}

