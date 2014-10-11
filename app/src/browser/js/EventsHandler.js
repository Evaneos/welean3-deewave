/**
 * Events handler
 * @param {CanvasManager} canvasManager A canvas manager
 * @param {PointsManger}  pointsManager A points manager
 */
export class EventsHandler {
    constructor(canvasManager, pointsManager) {
        var self = this;

        this.handleStart = function(e) {
            var coord = self.getEventCoordinates(e);

            canvasManager.paint = true;
            var points = pointsManager.recordPosition(coord.x - this.offsetLeft, coord.y - this.offsetTop);
            canvasManager.draw(points);
        };

        this.handleMove = function(e) {
            if(canvasManager.paint) {
                var coord = self.getEventCoordinates(e);
                var points =  pointsManager.recordPosition(coord.x - this.offsetLeft, coord.y - this.offsetTop, true);
                canvasManager.draw(points);
            }
        };

        this.handleEnd = function(e) {
            if(canvasManager.paint) {
                canvasManager.paint = false;
                pointsManager.sendPoints();
                $('.draw-container').hide();
                $('.player-container').show();

                // See if we reset the canvas + points here
                // this.canvasManager.clear();
            }
        };
    }

    getEventCoordinates(e) {
        var isTouchEvent = e.touches ? true : false;
        var x, y;
        if(isTouchEvent) {
            x = e.touches[0].pageX;
            y = e.touches[0].pageY;
        } else {
            x = e.pageX;
            y = e.pageY;
        }

        return {
            x: x,
            y: y
        };
    }
}