var Point     = require('./Point').Point;
var DataPoint = require('./DataPoint').DataPoint;

/**
 * PointsManager
 * Manage paths, points, etc..
 */
export class PointsManager {
    constructor(width, height) {
        this.points = [];

        this.width  = width;
        this.height = height;
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
     * Send the points to our API
     */
    sendPoints() {
        var dataPoints = this.computeDataPoints();
        // Send it w/ XHR
    }

    /**
     * Transform the points from the canvas to points for the API
     */
    computeDataPoints() {
        var dataPoints = [];

        this.points.forEach(function(point) {
            dataPoints.push(new DataPoint(point));
        });

        return dataPoints;
    }

    /**
     * Reset the points
     */
    reset() {
        this.points = [];
    }
}
