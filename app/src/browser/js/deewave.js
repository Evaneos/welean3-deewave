document.addEventListener( "DOMContentLoaded", main, false );

var context;
var clickX = [];
var clickY = [];
var clickDrag = [];
var paint;

function main() {
  var canvasElm = document.getElementById('draw');
  var canvas    = document.createElement('canvas');
  canvas.setAttribute('width', 800);
  canvas.setAttribute('height', 800);
  canvas.setAttribute('id', 'canvas');
  canvasElm.appendChild(canvas);

  context  = canvas.getContext('2d');
  paint = false;

  canvas.addEventListener('mousedown', handleStart, false);
  canvas.addEventListener('mousemove', handleMove, false);
  canvas.addEventListener('mouseup', handleEnd, false);
  canvas.addEventListener('mouseleave', handleEnd, false);
  canvas.addEventListener("touchstart", handleStart, false);
  canvas.addEventListener("touchend", handleEnd, false);
  canvas.addEventListener("touchcancel", handleEnd, false);
  canvas.addEventListener("touchleave", handleEnd, false);
  canvas.addEventListener("touchmove", handleMove, false);
}

function handleStart(e) {
    paint = true;
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
    redraw();
}

function handleMove(e) {
    if(paint){
        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
        redraw();
    }
}

function handleEnd(e) {
    paint = false;
}

function addClick(x, y, dragging)
{
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
}

function redraw(){
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);

  context.strokeStyle = 'rgba(39, 174, 96,1.0)';
  context.lineJoin = 'round';
  context.lineWidth = 5;

  var i = 0;
  for(; i < clickX.length; i++) {
    context.beginPath();

    if(clickDrag[i] && i){
      context.moveTo(clickX[i-1], clickY[i-1]);
    } else {
       context.moveTo(clickX[i]-1, clickY[i]);
    }
    context.lineTo(clickX[i], clickY[i]);
    context.closePath();
    context.stroke();
  }
}