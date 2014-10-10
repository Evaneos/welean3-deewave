var Point = require('./Point').Point;

/**
 * DrawManager
 * Manage paths, points, etc..
 */
export class DrawManager {
    constructor() {
        this.points = [];
    }

    recordPosition(x, y, dragging) {
        var point = new Point(x, y, dragging);
        this.points.push(point);
    }
}
