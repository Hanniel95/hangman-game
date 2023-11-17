/**
 * Represents a DOM element with additional utility methods.
 * @class
 */
class DOMElement {
  /**
   * The underlying HTML element associated with this instance.
   * @type {HTMLElement}
   * @private
   */
  #element;

  /**
   * Creates a new DOMElement instance.
   * @param {HTMLElement} [element] - The HTML element to associate with the instance. If not provided, a new <div> element is created.
   */
  constructor(element) {
    this.#element = element || document.createElement("div");
  }

  /**
   * Gets the underlying HTML element.
   * @type {HTMLElement}
   */
  get element() {
    return this.#element;
  }

  /**
   * Sets the underlying HTML element.
   * @type {HTMLElement}
   */
  set element(element) {
    this.#element = element;
  }

  /**
   * Gets the ID of the underlying HTML element.
   * @type {string}
   */
  get id() {
    return this.#element.id;
  }

  /**
   * Gets the X-coordinate of the position of the underlying HTML element relative to the viewport.
   * @type {number}
   */
  get positionX() {
    return this.element.getBoundingClientRect().x;
  }

  /**
   * Gets the Y-coordinate of the position of the underlying HTML element relative to the viewport.
   * @type {number}
   */
  get positionY() {
    return this.element.getBoundingClientRect().y;
  }

  /**
   * Gets the Position object representing the current X and Y coordinates of the underlying HTML element.
   * @returns {Position} - The Position object.
   */
  getPosition() {
    return new Position(this.positionX, this.positionY);
  }
}
