// List of colours to cycle through.
var colours = [
  "rgb(117, 255,  51)", 
  "rgb(219, 255,  51)",
  "rgb(155, 223, 211)",
  "rgb(255, 189,  51)",
  "rgb(162,  63,  78)",
  "rgb( 42,  84, 109)",
  "rgb(255, 139, 128)",
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


// Draw the next circle.
function drawNext(x, y) {
  if (drawing) {
    // Set the fill colour.
    ctx.fillStyle = colours[colour_i];
    // Draw a circle.
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fill();
    // Change to next colour.
    colour_i = (colour_i + 1) % colours.length;
    // Resize the circle.
    radius = (radius + 1) % 20;
  }
}


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

// Global resize timer.
var resizetimer;

// Set a delay for resizing to stop resizeCanvas triggering repeatedly.
function onResize() {
  // Clear the current timer, if there is one.
  clearTimeout(resizetimer);
  // Create a new timer.
  resizetimer = setTimeout(resizeCanvas, 200);
}

// What to do once we startup.
function startup() {

  // Add an event listener for mouse moves.
  drawspace.addEventListener('pointermove',  (e) => {
    
    // Get the bounding rectangle of the drawing space.
    var bounds = drawspace.getBoundingClientRect();
    
    // Calculate the point on the canvas.
    var x = e.clientX - bounds.left;
    var y = e.clientY - bounds.top;
    
    // Draw the circle.
    drawNext(x, y);

  });

  // Add an event listener for clicks.
  drawspace.addEventListener('click', (e) => {
    // Start or stop drawing.
    drawing = !drawing;
  });

  // Add a window resize listener.
  window.addEventListener('resize', onResize);
  // And trigger it at the start.
  resizeCanvas();

}

// From: https://developer.mozilla.org/en-US/docs/Web/API/Touch_events
document.addEventListener("DOMContentLoaded", startup);