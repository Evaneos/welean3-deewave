var DrawManager   = require('./DrawManager').DrawManager;
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

        this.drawManager   = new DrawManager();
        this.eventsHandler = new EventsHandler(this, this.drawManager);
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

    redraw() {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

        this.context.strokeStyle = 'rgba(39, 174, 96, 1.0)';
        this.context.lineJoin    = 'round';
        this.context.lineWidth   = 23;

        var i = 0;
        var points = this.drawManager.points;
        var length = points.length;
        for(; i < length; i++) {
            this.context.beginPath();

            if(i && points[i] && points[i].dragging) {
                this.context.moveTo(points[i - 1].x, points[i - 1].y);
            } else {
                this.context.moveTo(points[i].x - 1, points[i].y);
            }

            this.context.lineTo(points[i].x, points[i].y);

            this.context.closePath();
            this.context.stroke();
        }
    }
}
