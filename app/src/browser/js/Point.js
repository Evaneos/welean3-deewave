/**
 * Point
 * @param {Int} x
 * @param {Int} y
 * @param {Boolean} dragging
 */
export class Point {
    constructor(x, y, dragging) {
        this.x        = x;
        this.y        = y;
        this.dragging = dragging || false;
        this.time     = Date.now();
    }
}
