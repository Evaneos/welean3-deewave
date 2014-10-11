/**
 * Data point (for the API)
 * @param {Point} point
 * @param {Int}   width
 * @param {Int}   height
 */
export class DataPoint {
    constructor(point, width, height) {
        this.x        = point.x / width;
        this.y        = point.y / height;
        this.time     = point.time || Date.now();
    }
}
