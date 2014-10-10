/**
 * Events handler
 * @param {CanvasManger} canvasManager A canvas manager
 */
export class EventsHandler {
    constructor(canvasManager, drawManager) {
        this.handleStart = function(e) {
            canvasManager.paint = true;
            drawManager.recordPosition(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
            canvasManager.redraw();
        };

        this.handleMove = function(e) {
            if(canvasManager.paint) {
                drawManager.recordPosition(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
                canvasManager.redraw();
            }
        };

        this.handleEnd = function(e) {
            canvasManager.paint = false;
        };
    }
}
