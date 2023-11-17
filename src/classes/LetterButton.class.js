/**
 * Represents a letter button in the game.
 * @class
 * @extends DOMElement
 */
class LetterButton extends DOMElement {
  /**
   * The CSS class for disabled state.
   * @type {string}
   * @static
   */
  static DISABLED_CLASS = "disabled";

  /**
   * The CSS class for the letter box.
   * @type {string}
   * @static
   */
  static LETTER_BOX_CLASS = "letter-box";

  /**
   * The format for clone element IDs.
   * @type {string}
   * @static
   */
  static CLONE_ID_FORMAT = "clone-letter-button-%s%s";

  /**
   * Letter associated with the button.
   * @type {string}
   * @private
   */
  #letter;

  /**
   * Active state of the button.
   * @type {Boolean}
   * @private
   */
  #active;

  /**
   * The game to which the space item belongs.
   * @type {Game}
   * @private
   */
  #game;

  /**
   * The number of clones. Used to have a specific ID for each clones
   * @type {number}
   * @private
   */
  #clones;

  /**
   * Creates a LetterButton instance.
   * @param {string} letter - The letter associated with the button.
   */
  constructor(letter) {
    super();

    this.#letter = letter;
    this.#active = true;
    this.#clones = 0;
  }

  /**
   * Gets the game associated with the button.
   * @returns {Game} - The game instance.
   */
  get game() {
    return this.#game;
  }

  /**
   * Sets the game associated with the button.
   * @param {Game} game - The game instance.
   */
  set game(game) {
    this.#game = game;
  }

  /**
   * Gets the letter associated with the button.
   * @returns {string} - The letter.
   */
  get letter() {
    return this.#letter;
  }

  /**
   * Sets the active state of the button.
   * @param {boolean} value - The active state.
   */
  set active(value) {
    this.#active = value;
    this.element.classList.toggle(this.disabledClass, !value);
  }

  /**
   * Gets the active state of the button.
   * @returns {boolean} - The active state.
   */
  get active() {
    return this.#active;
  }

  /**
   * Gets the CSS class for disabled state.
   * @returns {string} - The CSS class.
   */
  get disabledClass() {
    return LetterButton.DISABLED_CLASS;
  }

  /**
   * Gets the CSS class for the letter box.
   * @returns {string} - The CSS class.
   */
  get letterBoxClass() {
    return LetterButton.LETTER_BOX_CLASS;
  }

  /**
   * Gets the unique identifier for the button.
   * @returns {string} - The identifier.
   */
  get id() {
    return `letter-button-${this.letter}`;
  }

  /**
   * Gets the HTML element associated with the button.
   * @returns {HTMLElement} - The HTML element.
   */
  get element() {
    return document.getElementById(this.id);
  }

  /**
   * Generates the HTML template for the button.
   * @returns {HTMLButtonElement} - The button element.
   */
  getTemplate() {
    const btn = document.createElement("button");
    btn.id = this.id;
    btn.type = "button";
    btn.classList.add(this.letterBoxClass);
    btn.textContent = this.letter;
    return btn;
  }

  /**
   * Clones the button element.
   * @returns {HTMLButtonElement} - The cloned button element.
   */
  clone() {
    this.#clones++;
    const cloneId = LetterButton.CLONE_ID_FORMAT.replace(
      "%s",
      this.letter
    ).replace("%s", this.#clones);

    // Creating the clone HTML element
    const element = document.createElement("button");
    element.type = "button";
    element.id = cloneId;
    element.classList.add(this.letterBoxClass);
    element.textContent = this.letter;

    return element;
  }

  /**
   * Clones the button element and appends it to the game's spaces element.
   * @returns {HTMLButtonElement} - The cloned button element.
   */
  cloneElement() {
    const clone = this.clone();
    this.game.spacesElement.appendChild(clone);
    return document.getElementById(clone.id);
  }

  /**
   * Handles the click event on the button, triggering the game's play method.
   */
  click() {
    if (!this.#active) return;
    this.game.play(this);
  }

  /**
   * Initializes the event handler for the button.
   */
  initEventHandler() {
    this.element.addEventListener("click", this.click.bind(this));
  }

  /**
   * Prepares the button for interaction by initializing the event handler.
   */
  ready() {
    this.initEventHandler();
  }
}
