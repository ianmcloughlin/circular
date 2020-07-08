// List of colours to cycle through.
var colours = [
  "rgb(149, 125, 173)",
  "rgb(254, 200, 216)",
  "rgb(255, 223, 211)",
  "rgb(255, 255, 255)",
  "rgb(162,  63,  78)",
  "rgb( 42,  84, 109)",
  "rgb(255, 239, 128)",
  "rgb(163, 222, 156)",
  "rgb(179,  51,  50)",
  "rgb(255, 146,  66)",
  "rgb( 66, 133, 244)",
  "rgb(234,  67,  53)",
  "rgb(251, 188,   5)",
  "rgb( 52, 168,  83)"
];
// Current colour.
var colour_i = 0;
// Radius.
var radius = 10;
// Drawing or not drawing.
var drawing = true;

// The canvas.
var drawspace = document.getElementById("drawspace");
// The canvas's 2D context.
var ctx = drawspace.getContext("2d");

// What to do when the window is resized.
function resizeCanvas() {
  // Save canvas contents.
  var original = ctx.getImageData(0, 0, drawspace.width, drawspace.height);

  // Resize the width.
  drawspace.setAttribute('width', window.innerWidth);

  // Resize the height.
  setTimeout(function() {
    drawspace.setAttribute('height', window.innerHeight);
  }, 0);

  // Redraw the original contents.
  setTimeout(function() {
    ctx.putImageData(original, 0, 0);
  }, 0);

};

// Webkit/Blink will fire this on load, but Gecko doesn't.
window.onresize = resizeCanvas;

// So we fire it manually...
resizeCanvas();

// Get the mouse position on an element.
function getMousePos(canvas, e) {
  // Get the bounding rectangle of the element.
  var rect = canvas.getBoundingClientRect();
  // Return the object minus the bounding coordinates.
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
}

// Draw the next circle.
function drawNext(e) {
  if (drawing) {
    // Resize the circle.
    radius = (radius + 1) % 20;
    // Get the mouse position on the canvas.
    var mousepos = getMousePos(drawspace, e);
    // Set the fill colour.
    ctx.fillStyle = colours[colour_i];
    // Draw a circle.
    ctx.beginPath();
    ctx.arc(mousepos.x, mousepos.y, radius, 0, 2 * Math.PI, false);
    ctx.fill();
    // Change to next colour.
    colour_i = (colour_i + 1) % colours.length;
  }
}

// Add an event listener for mouse moves.
drawspace.addEventListener('mousemove', (e) => {
  drawNext(e);
});

// Add an event listener for touch moves.
drawspace.addEventListener('touchmove', (e) => {
  //e.preventDefault();
  drawNext(e);
});

// Add an event listener for clicks.
drawspace.addEventListener('click', (e) => {
  drawing = !drawing;
});