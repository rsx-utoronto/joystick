var haveEvents = 'ongamepadconnected' in window; 
var controllers = {};

function connecthandler(e) {
  addgamepad(e.gamepad);
}

function addgamepad(gamepad) {
  controllers[gamepad.index] = gamepad;

  var d = document.createElement("div");
  d.setAttribute("id", "controller" + gamepad.index);

  var t = document.createElement("h1");
  t.appendChild(document.createTextNode("gamepad: " + gamepad.id));
  d.appendChild(t);

  var b = document.createElement("div");
  b.className = "buttons";
  for (var i = 0; i < gamepad.buttons.length; i++) {
    var e = document.createElement("span");
    e.className = "button";
    //e.id = "b" + i;
    e.innerHTML = i;
    b.appendChild(e);
  }

  d.appendChild(b);

  var a = document.createElement("div");
  a.className = "axes";

  for (var i = 0; i < gamepad.axes.length; i++) {
    var p = document.createElement("progress");
    p.className = "axis";
    //p.id = "a" + i;
    p.setAttribute("max", "2");
    p.setAttribute("value", "1");
    p.innerHTML = i;
    a.appendChild(p);
  }

  d.appendChild(a);

  // See https://github.com/luser/gamepadtest/blob/master/index.html
  var start = document.getElementById("start");
  if (start) {
    start.style.display = "none";
  }

  document.body.appendChild(d);
  requestAnimationFrame(updateStatus);
}

function disconnecthandler(e) {
  removegamepad(e.gamepad);
}

function removegamepad(gamepad) {
  var d = document.getElementById("controller" + gamepad.index);
  document.body.removeChild(d);
  delete controllers[gamepad.index];
}

function updateStatus() {
  if (!haveEvents) {
    scangamepads();
  }

  var i = 0;
  var j;

  for (j in controllers) {
    var controller = controllers[j];
    var d = document.getElementById("controller" + j);
    var buttons = d.getElementsByClassName("button");

    for (i = 0; i < controller.buttons.length; i++) {
      var b = buttons[i];
      var val = controller.buttons[i];
      var pressed = val == 1.0;
      if (typeof(val) == "object") {
        pressed = val.pressed;
        val = val.value;
      }

      var pct = Math.round(val * 100) + "%";
      b.style.backgroundSize = pct + " " + pct;

      if (pressed) {
        b.className = "button pressed";
      } else {
        b.className = "button";
      }
    }

    var axes = d.getElementsByClassName("axis");
    for (i = 0; i < controller.axes.length; i++) {
      var a = axes[i];
      a.innerHTML = i + ": " + controller.axes[i].toFixed(4);
      a.setAttribute("value", controller.axes[i] + 1);
    }
	
	// NEW CODE
	// controller.axes: [LR, LD, RR, RD]
	console.log(controller.axes);
	
	// for circles
	var control_array = ["LR","LD","RR","RD"];
	for (var i = 0; i < 4; i++) {
		axis = controller.axes[i];
		if (Math.abs(axis) < 0.01) {
			$("svg[id="+control_array[i]+"]").children().attr("r", "0");
			$("svg[id="+control_array[i]+"]").children().attr("stroke-width", "0");
		}
		else {
			$("svg[id="+control_array[i]+"]").children().attr("r", (40*Math.abs(axis)).toString());
			$("svg[id="+control_array[i]+"]").children().attr("fill", axis > 0 ? "rgb(0,255,0)" : "rgb(255,0,0)");
			$("svg[id="+control_array[i]+"]").children().attr("stroke", axis > 0 ? "rgb(0,150,0)" : "rgb(150,0,0)");
			$("svg[id="+control_array[i]+"]").children().attr("stroke-width", "4");
		}
	}
	
	// for arrows
	for (var pad = 0; pad < 3; pad = pad + 2) {
		var id = "svg[id='arrow" + pad.toString() + "]";
		
		// up-down vs left-right arrows
		for (var DL = 1; DL >= 0; DL--) {
			var updown = DL ? "#U" : "#L";
			var i = controller.axes[pad + DL];
			var shift = Math.sign(i)*20;
			var mid = 170;
			var points = [[mid+i*shift,mid+shift], [mid+i*shift,mid+shift+i*70], [mid+i*50,mid+shift+i*70],[mid,mid+shift+i*140], [mid-i*50,mid+shift+i*70], [mid-i*shift,mid+shift+i*70], [mid-i*shift,mid+shift]];
			
			for (var i = 0; i < 7; i++) {
				if (!DL) // invert x-y coordinates if the arrow is in LR direction
					points[i] = points[i].reverse();
				points[i] = points[i].join();
			}
			points = points.join(" ");
			Math.abs(i) < 0.01 ? $(id).children(updown).hide() : $(id).children(updown).show();
			$(id).children(updown).attr("points",points);
		}
	}
	
  }

  requestAnimationFrame(updateStatus);
}

function scangamepads() {
  var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
  for (var i = 0; i < gamepads.length; i++) {
    if (gamepads[i]) {
      if (gamepads[i].index in controllers) {
        controllers[gamepads[i].index] = gamepads[i];
      } else {
        addgamepad(gamepads[i]);
      }
    }
  }
}

console.log("Running scriptExample.js");

window.addEventListener("gamepadconnected", connecthandler);
window.addEventListener("gamepaddisconnected", disconnecthandler);

if (!haveEvents) {
  setInterval(scangamepads, 500);
}