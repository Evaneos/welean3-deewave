var Point = require('./Point').Point;

/**
 * PointsManager
 * Manage paths, points, etc..
 */
export class PointsManager {
    constructor() {
        this.points = [];
    }

    /**
     * Record the position of a new point
     * @param  {Int}     x        point's x
     * @param  {Int}     y        point's y
     * @param  {Boolean} dragging either the point is from a new chain or not
     * @return {Array}            the last or last 2 points
     */
    recordPosition(x, y, dragging) {
        var point = new Point(x, y, dragging);
        this.points.push(point);

        var length = this.points.length;
        if(length > 1) {
            return  [
                this.points[length - 2],
                point
            ];
        }
        return [point];
    }

    /**
     * Reset the points
     */
    reset() {
        this.points = [];
    }
}
