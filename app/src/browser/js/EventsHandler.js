/**
 * Events handler
 * @param {CanvasManger} canvasManager A canvas manager
 */
export class EventsHandler {
    constructor(canvasManager, pointsManager) {
        this.handleStart = function(e) {
            canvasManager.paint = true;
            var points = pointsManager.recordPosition(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
            canvasManager.draw(points);
        };

        this.handleMove = function(e) {
            if(canvasManager.paint) {
                var points =  pointsManager.recordPosition(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
                canvasManager.draw(points);
            }
        };

        this.handleEnd = function(e) {
            if(canvasManager.paint) {
                canvasManager.paint = false;
                $('.draw-container').hide();
                $('.player-container').show();
            }
        };
    }
}
