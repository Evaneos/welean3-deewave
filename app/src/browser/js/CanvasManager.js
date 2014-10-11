var PointsManager = require('./PointsManager').PointsManager;
var EventsHandler = require('./EventsHandler').EventsHandler;

/**
 * Canvas Manager
 * @param {int} width  canvas's width
 * @param {int} height canvas's height
 */
export class CanvasManager {
    constructor(width, height) {
        this.canvas  = null;
        this.context = null;
        this.paint   = false;

        this.size = {
            width: width,
            height: height
        };

        this.pointsManager = new PointsManager(width, height);
        this.eventsHandler = new EventsHandler(this, this.pointsManager);
    }

    init() {
        var canvasElm = document.getElementById('draw');
        this.canvas   = document.createElement('canvas');
        this.canvas.setAttribute('width', this.size.width);
        this.canvas.setAttribute('height', this.size.height);
        this.canvas.setAttribute('id', 'canvas');
        canvasElm.appendChild(this.canvas);
        this.context = this.canvas.getContext('2d');

        this.registerEvents();
    }


    /**
     * Register events for the canvas
     */
    registerEvents() {
        // Mouse
        this.canvas.addEventListener('mousedown'   , this.eventsHandler.handleStart , false);
        this.canvas.addEventListener('mousemove'   , this.eventsHandler.handleMove  , false);
        this.canvas.addEventListener('mouseup'     , this.eventsHandler.handleEnd   , false);
        this.canvas.addEventListener('mouseleave'  , this.eventsHandler.handleEnd   , false);
        // Touch
        this.canvas.addEventListener("touchstart"  , this.eventsHandler.handleStart , false);
        this.canvas.addEventListener("touchend"    , this.eventsHandler.handleEnd   , false);
        this.canvas.addEventListener("touchcancel" , this.eventsHandler.handleEnd   , false);
        this.canvas.addEventListener("touchleave"  , this.eventsHandler.handleEnd   , false);
        this.canvas.addEventListener("touchmove"   , this.eventsHandler.handleMove  , false);
    }

    draw(points) {
        this.context.strokeStyle = 'rgba(39, 174, 96, 1)';
        this.context.lineJoin    = 'round';
        this.context.lineWidth   = 23;

        this.context.beginPath();


        // We only draw a path between the last point and the new one
        var point = points[0];
        if(points.length > 1) {
            var oldPoint = points[0];
            var newPoint = points[1];
            if(newPoint && newPoint.dragging) {
                this.context.moveTo(oldPoint.x, oldPoint.y - 1);
            } else {
                this.context.moveTo(newPoint.x - 1, newPoint.y);
            }
            point = points[1];
        } else {
            if(point && point.dragging) {
                this.context.moveTo(point.x - 1, point.y - 1);
            } else {
                this.context.moveTo(point.x - 1, point.y);
            }
        }

        this.context.lineTo(point.x, point.y);

        this.context.closePath();
        this.context.stroke();
    }

    clear() {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        this.pointsManager.reset();
    }
}
