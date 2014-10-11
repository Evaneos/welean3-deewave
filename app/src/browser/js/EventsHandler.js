/**
 * Events handler
 * @param {CanvasManger} canvasManager A canvas manager
 */
export class EventsHandler {
    constructor(canvasManager, pointsManager) {
        this.canvasManager = canvasManager;
        this.pointsManager = pointsManager;
    }

    handleStart(e) {
        this.canvasManager.paint = true;
        var points = this.pointsManager.recordPosition(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
        this.canvasManager.draw(points);
    }

    handleMove(e) {
        if(this.canvasManager.paint) {
            var points =  this.pointsManager.recordPosition(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
            this.canvasManager.draw(points);
        }
    }

    handleEnd(e) {
        if(this.canvasManager.paint) {
            this.canvasManager.paint = false;
            $('.draw-container').hide();
            $('.player-container').show();

            // See if we reset the canvas + points here
            // this.canvasManager.clear();
        }
    }
}
