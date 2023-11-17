/**
 * Represents a 2D position with X and Y coordinates.
 * @class
 */
class Position {
  /**
   * The X-coordinate of the position.
   * @type {number}
   */
  x;

  /**
   * The Y-coordinate of the position.
   * @type {number}
   */
  y;

  /**
   * Creates a new Position instance.
   * @param {number} x - The X-coordinate.
   * @param {number} y - The Y-coordinate.
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
