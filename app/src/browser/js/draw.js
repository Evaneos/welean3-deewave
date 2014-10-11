var CanvasManager = require('./CanvasManager').CanvasManager;

document.addEventListener('DOMContentLoaded', main, false);

var CANVAS_WIDHT  = 800;
var CANVAS_HEIGHT = 800;

/**
 * Main function
 */
function main() {
    var canvasManager = new CanvasManager(CANVAS_WIDHT, CANVAS_HEIGHT);
    canvasManager.init();


}
