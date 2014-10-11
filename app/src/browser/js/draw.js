require('./utils');

var CanvasManager = require('./CanvasManager').CanvasManager;

document.addEventListener('DOMContentLoaded', main, false);

var CANVAS_WIDHT  = window.innerWidth;
var CANVAS_HEIGHT = window.innerHeight;

/**
 * Main function
 */
function main() {
    var canvasManager = new CanvasManager(CANVAS_WIDHT, CANVAS_HEIGHT);
    canvasManager.init();

    
}
