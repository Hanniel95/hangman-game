/**
 * Represents a space item in the game, extending DOMElement.
 * @class
 * @extends DOMElement
 */
class SpaceItem extends DOMElement {
  /**
   * The CSS class for space items.
   * @type {string}
   * @static
   */
  static ITEM_CLASS = "space-item";

  /**
   * The index of the space item.
   * @type {number}
   * @private
   */
  #index;

  /**
   * The game to which the space item belongs.
   * @type {Game}
   * @private
   */
  #game;

  /**
   * Creates a new SpaceItem instance.
   * @param {number} index - The index of the space item.
   */
  constructor(index) {
    super();
    this.#index = index;
  }

  /**
   * Gets the index of the space item.
   * @type {number}
   */
  get index() {
    return this.#index;
  }

  /**
   * Gets the game to which the space item belongs.
   * @type {Game}
   */
  get game() {
    return this.#game;
  }

  /**
   * Sets the game to which the space item belongs.
   * @type {Game}
   */
  set game(game) {
    this.#game = game;
  }

  /**
   * Gets the ID of the space item (depends of index).
   * @type {string}
   */
  get id() {
    return `space-item-${this.index}`;
  }

  /**
   * Generates the HTML template for the space item.
   * @returns {HTMLDivElement} - The HTML element representing the space item.
   */
  getTemplate() {
    const elem = document.createElement("div");
    elem.id = `${this.id}`;
    elem.classList.add(SpaceItem.ITEM_CLASS);

    return elem;
  }

  /**
   * Gets the HTML element of the space item.
   * @type {HTMLDivElement}
   */
  get element() {
    return document.getElementById(this.id);
  }

  ready() {}
}
