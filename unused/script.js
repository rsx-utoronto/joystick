var window = window.constructor;

console.log("hello world!");

function printButtons(buttons) {
	var i;
	for (i = 0; i < buttons.length; i++) {
		console.log("Button %d: Pressed: %d, Value: %f", i, buttons[i].pressed, buttons[i].value);
	}
}

//connected
window.addEventListener("gamepadconnected", function(e) {
  console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
    e.gamepad.index, e.gamepad.id,
    e.gamepad.buttons.length, e.gamepad.axes.length);
	console.log("Gamepad mapping: %s\n", e.gamepad.mapping);
	console.log("Gamepad buttons: ");
	printButtons(e.gamepad.buttons);
	console.log("Gamepad axes: %s\n", e.gamepad.axes.toString());
});

//disconnected
window.addEventListener("gamepaddisconnected", function(e) {
  console.log("Gamepad disconnected from index %d: %s\n",
    e.gamepad.index, e.gamepad.id);
});

