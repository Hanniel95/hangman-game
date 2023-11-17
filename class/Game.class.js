class Game {
  static WORDS = ["NOURRITURE", "MARS", "AVRIL"];
  static HANGMAN_IMAGE_PATH = "./assets/images/hangman-";
  static INITIAL_LIFE_COUNT = 5;
  static MAX_LIFE_COUNT = 5;

  #spacesElementSelector;
  #buttonsElementSelector;
  #hangmanImageSelector;

  buttons;
  spaces;

  words;

  index;
  lifes;

  get spacesElement() {
    const element = document.querySelector(this.#spacesElementSelector);
    if (!element) {
      throw new Error(
        `Element not found with selector: ${this.#spacesElementSelector}`
      );
    }
    return element;
  }

  get buttonsElement() {
    const element = document.querySelector(this.#buttonsElementSelector);
    if (!element) {
      throw new Error(
        `Element not found with selector: ${this.#buttonsElementSelector}`
      );
    }
    return element;
  }

  get hangmanImage() {
    return document.querySelector(this.#hangmanImageSelector);
  }

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

  get currentWord() {
    return Game.WORDS[this.index];
  }

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

    // Reinitialiser les vies
    this.lifes = Game.INITIAL_LIFE_COUNT;
  }

  initializeButtons() {
    this.buttons = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => {
      const letterButton = new LetterButton(letter, this);
      letterButton.game = this;
      return letterButton;
    });
  }

  initializeSpaces() {
    this.spaces = this.currentWord.split("").map((letter, index) => {
      const spaceItem = new SpaceItem(index, this);
      spaceItem.game = this;
      return spaceItem;
    });
  }

  activateLetterButtons() {
    for (const button of this.buttons) {
      button.ready();
    }
  }

  spacesReady() {
    for (const space of this.spaces) {
      space.ready();
    }
  }

  play(button) {
    const indexes = this.currentWord
      .split("")
      .map((item, index) => ({ letter: item, index }))
      .filter((item) => item.letter === button.letter)
      .map((item) => item.index);

    if (indexes.length) {
      this.handleCorrectGuess(indexes, button);
    } else {
      this.handleIncorrectGuess(button);
    }
  }

  async handleCorrectGuess(indexes, button) {
    await this.handleCorrectGuessAnimation(indexes, button);

    if (this.isCurrentWordComplete()) {
      this.handleCompletedWord();
    }
  }

  handleCompletedWord() {
    this.index++;
    this.initializeGame();
  }

  isCurrentWordComplete() {
    return this.spaces.every((item) => item.element.style.display == "none");
  }

  handleCorrectGuessAnimation(indexes, button) {
    return Promise.all(
      indexes.map(async (index) => {
        const space = this.spaces[index];
        const cloneElt = button.cloneElt();

        button.active = false;

        const movementAnimator = new Movement();
        await movementAnimator.goToPosition(
          cloneElt,
          button.getPosition(),
          new Position(space.positionX, space.positionY - 20)
        );

        const clonedElem = cloneElt.cloneNode(true);
        clonedElem.style.position = "static";

        space.element.parentNode.insertBefore(clonedElem, space.element);

        clonedElem.addEventListener("click", async () => {
          await this.handleCorrectGuessButtonClick(clonedElem, space, button);
        });

        space.element.style.display = "none";
        cloneElt.parentNode.removeChild(cloneElt);
      })
    );
  }

  async handleCorrectGuessButtonClick(clonedButtonElement, space, button) {
    const movementAnimator = new Movement();

    space.element.style.display = "";

    await movementAnimator.returnToPosition(
      clonedButtonElement,
      new Position(
        clonedButtonElement.getBoundingClientRect().x,
        clonedButtonElement.getBoundingClientRect().y
      ),
      new Position(button.positionX, button.positionY)
    );

    button.active = true;
  }

  handleIncorrectGuess(button) {
    this.lifes--;

    if (this.lifes > 0) {
      button.active = false;
      const imageUrl = `${Game.HANGMAN_IMAGE_PATH}${
        Game.MAX_LIFE_COUNT - (this.lifes - 1)
      }.png`;
      this.hangmanImage.src = imageUrl;
    }
  }
}
