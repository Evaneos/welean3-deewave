/**
 * Data point (for the API)
 * @param {Point} point
 */
export class DataPoint {
    constructor(point) {
        this.x        = point.x;
        this.y        = point.y;
        this.time     = point.time || Date.now();
    }
}
