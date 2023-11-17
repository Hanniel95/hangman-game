/**
 * Represents the Hangman game.
 * @class
 */
class Game {
  /**
   * Array of words for the game.
   * @type {string[]}
   * @static
   */
  static WORDS = ["NOURRITURE", "MARS", "AVRIL"];

  /**
   * Path to hangman image assets.
   * @type {string}
   * @static
   */
  static HANGMAN_IMAGE_PATH = "./assets/images/hangman-";

  /**
   * Initial count of player's lives.
   * @type {number}
   * @static
   */
  static INITIAL_LIFE_COUNT = 5;

  /**
   * Maximum count of player's lives.
   * @type {number}
   * @static
   */
  static MAX_LIFE_COUNT = 5;

  #spacesElementSelector;
  #buttonsElementSelector;
  #hangmanImageSelector;

  /**
   * List of letter buttons
   * @type {LetterButton[]}
   */
  buttons;

  /**
   * List of space items
   * @type {SpaceItem[]}
   */
  spaces;

  index;
  lifes;

  /**
   * Creates a Game instance.
   * @constructor
   * @param {string} spacesElementSelector - Selector for spaces element.
   * @param {string} buttonsElementSelector - Selector for buttons element.
   * @param {string} hangmanImageSelector - Selector for hangman image element.
   */
  constructor(
    spacesElementSelector,
    buttonsElementSelector,
    hangmanImageSelector
  ) {
    this.#spacesElementSelector = spacesElementSelector;
    this.#buttonsElementSelector = buttonsElementSelector;
    this.#hangmanImageSelector = hangmanImageSelector;

    this.buttons = [];
    this.spaces = [];

    this.index = 0;
    this.lifes = Game.INITIAL_LIFE_COUNT;
  }

  /**
   * Gets the spaces element from the DOM.
   * @returns {HTMLElement} - The spaces element.
   * @throws Will throw an error if the element is not found.
   */
  get spacesElement() {
    const element = document.querySelector(this.#spacesElementSelector);
    if (!element) {
      throw new Error(
        `Element not found with selector: ${this.#spacesElementSelector}`
      );
    }
    return element;
  }

  /**
   * Gets the buttons element from the DOM.
   * @returns {HTMLElement} - The buttons element.
   * @throws Will throw an error if the element is not found.
   */
  get buttonsElement() {
    const element = document.querySelector(this.#buttonsElementSelector);
    if (!element) {
      throw new Error(
        `Element not found with selector: ${this.#buttonsElementSelector}`
      );
    }
    return element;
  }

  /**
   * Gets the hangman image element from the DOM.
   * @returns {HTMLElement} - The hangman image element.
   * @throws Will throw an error if the element is not found.
   */
  get hangmanImage() {
    const element = document.querySelector(this.#hangmanImageSelector);
    if (!element) {
      throw new Error(
        `Element not found with selector: ${this.#hangmanImageSelector}`
      );
    }
    return element;
  }

  /**
   * Gets the current word from the WORDS array based on the current index.
   * @returns {string} - The current word.
   */
  get currentWord() {
    return Game.WORDS[this.index];
  }

  /**
   * Initializes the Hangman game.
   */
  initializeGame() {
    this.initializeButtons();
    this.initializeSpaces();

    this.buttonsElement.innerHTML = "";
    this.spacesElement.innerHTML = "";

    this.buttonsElement.append(
      ...this.buttons.map((button) => button.getTemplate())
    );
    this.spacesElement.append(
      ...this.spaces.map((space) => space.getTemplate())
    );

    this.activateLetterButtons();
    this.spacesReady();

    // Reset the player's lives
    this.lifes = Game.INITIAL_LIFE_COUNT;
    this.loadHangmanImage(Game.MAX_LIFE_COUNT - this.lifes + 1);
  }

  /**
   * Initializes letter buttons for the game.
   */
  initializeButtons() {
    this.buttons = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => {
      const letterButton = new LetterButton(letter, this);
      letterButton.game = this;
      return letterButton;
    });
  }

  /**
   * Initializes spaces for the current word.
   */
  initializeSpaces() {
    this.spaces = this.currentWord.split("").map((letter, index) => {
      const spaceItem = new SpaceItem(index, this);
      spaceItem.game = this;
      return spaceItem;
    });
  }

  /**
   * Activates letter buttons for interaction.
   */
  activateLetterButtons() {
    for (const button of this.buttons) {
      button.ready();
    }
  }

  /**
   * Makes spaces ready for the current word.
   */
  spacesReady() {
    for (const space of this.spaces) {
      space.ready();
    }
  }

  /**
   * Handles button's move when a letter button is clicked.
   * @param {LetterButton} button - The clicked letter button.
   */
  play(button) {
    const indexes = this.currentWord
      .split("")
      .map((letter, index) => ({ letter, index }))
      .filter((item) => item.letter === button.letter)
      .map((item) => item.index);

    if (indexes.length) {
      this.handleCorrectGuess(indexes, button);
    } else {
      this.handleIncorrectGuess(button);
    }
  }

  /**
   * Handles the correct guess by the player.
   * @param {number[]} indexes - The indexes where the guessed letter appears in the word.
   * @param {LetterButton} button - The clicked letter button.
   */
  async handleCorrectGuess(indexes, button) {
    await this.handleCorrectGuessAnimation(indexes, button);

    if (this.isCurrentWordComplete()) {
      this.handleCompletedWord();
    }
  }

  /**
   * Handles the completion of the current word.
   */
  handleCompletedWord() {
    this.index++;
    this.initializeGame();
  }

  /**
   * Checks if the current word is completely guessed.
   * @returns {boolean} - True if the word is completely guessed, otherwise false.
   */
  isCurrentWordComplete() {
    return this.spaces.every((item) => !item.isVisible());
  }

  /**
   * Handles the animation for a correct guess.
   * @param {number[]} indexes - The indexes where the guessed letter appears in the word.
   * @param {LetterButton} button - The clicked letter button.
   */
  async handleCorrectGuessAnimation(indexes, button) {
    const animations = indexes.map(async (index) => {
      const space = this.spaces[index];
      const clonedButton = button.cloneElement();

      button.active = false;

      const movementAnimator = new Movement();
      await movementAnimator.goToPosition(
        clonedButton,
        button.getPosition(),
        new Position(space.positionX, space.positionY - 20)
      );

      const buttonForSpace = clonedButton.cloneNode(true);
      buttonForSpace.style.position = "static";

      space.element.parentNode.insertBefore(buttonForSpace, space.element);

      buttonForSpace.addEventListener("click", async () => {
        await this.handleCorrectGuessButtonClick(buttonForSpace, space, button);
      });

      space.hide();
      clonedButton.parentNode.removeChild(clonedButton);
    });

    await Promise.all(animations);
  }

  /**
   * Handles the click on a letter button after a correct guess animation.
   * @param {HTMLElement} clonedButton - The cloned button element.
   * @param {SpaceItem} space - The corresponding space element.
   * @param {LetterButton} button - The original letter button.
   */
  async handleCorrectGuessButtonClick(clonedButton, space, button) {
    const movementAnimator = new Movement();
    const clonedButtons = [...document.querySelectorAll(".letter-box")]
      .filter(
        (element) =>
          element.id.startsWith("clone-letter-button") &&
          element.innerText === clonedButton.innerText
      )
      .map((element) => new DOMElement(element));

    await Promise.all(
      clonedButtons.map(async (clonedButton) => {
        new DOMElement(clonedButton.element.nextElementSibling).show();
        return movementAnimator.returnToPosition(
          clonedButton.element,
          clonedButton.getPosition(),
          button.getPosition()
        );
      })
    );

    button.active = true;
  }

  /**
   * Handles an incorrect guess by the player.
   * @param {LetterButton} button - The clicked letter button.
   */
  handleIncorrectGuess(button) {
    this.lifes--;

    if (this.lifes > 0) {
      button.active = false;
      this.loadHangmanImage(Game.MAX_LIFE_COUNT - this.lifes + 1);
    }
  }

  /**
   * Refresh hangman image
   */
  loadHangmanImage(level = 6) {
    const imageUrl = `${Game.HANGMAN_IMAGE_PATH}${level}.png`;
    this.hangmanImage.src = imageUrl;
  }
}
