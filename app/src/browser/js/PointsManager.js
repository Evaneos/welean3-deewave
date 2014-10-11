var Point      = require('./Point').Point;
var DataPoint  = require('./DataPoint').DataPoint;


var PlayerManager = require('./PlayerManager').PlayerManager;
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

        // LOL WTF JQuery
        $.ajax({
            url: '/songify',
            type: 'POST',
            data: JSON.stringify(dataPoints),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            async: false,
            success: function(tracks) {
                PlayerManager.display(tracks);
            }
        });
    }

    /**
     * Transform the points from the canvas to points for the API
     */
    computeDataPoints() {
        var dataPoints = [];
        var self = this;

        this.points.forEach(function(point) {
            dataPoints.push(new DataPoint(point, self.width, self.height));
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
