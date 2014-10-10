/**
 * Events handler
 * @param {CanvasManger} canvasManager A canvas manager
 */
export class EventsHandler {
    constructor(canvasManager, drawManager) {
        this.handleStart = function(e) {
            canvasManager.paint = true;
            var points = drawManager.recordPosition(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
            canvasManager.draw(points);
        };

        this.handleMove = function(e) {
            if(canvasManager.paint) {
                var points =  drawManager.recordPosition(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
                canvasManager.draw(points);
            }
        };

        this.handleEnd = function(e) {
            canvasManager.paint = false;
        };
    }
}
