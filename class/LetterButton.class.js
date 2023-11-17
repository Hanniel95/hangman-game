class LetterButton {
  static DISABLED_CLASS = "disabled";
  static LETTER_BOX_CLASS = "letter-box";

  letter;
  _active;
  game;
  clones;

  constructor(letter) {
    this.letter = letter;
    this._active = true;
    this.clones = 0;
  }

  get disabledClass() {
    return LetterButton.DISABLED_CLASS;
  }

  get letterBoxClass() {
    return LetterButton.LETTER_BOX_CLASS;
  }

  get id() {
    const { letter } = this;
    return `letter-button-${letter}`;
  }

  set active(value) {
    this._active = value;
    if (value) {
      this.element.classList.remove(this.disabledClass);
    } else {
      this.element.classList.add(this.disabledClass);
    }
  }

  get active() {
    return this._active;
  }

  get element() {
    return document.getElementById(this.id);
  }

  get positionX() {
    return this.element.getBoundingClientRect().x;
  }

  get positionY() {
    return this.element.getBoundingClientRect().y;
  }

  getPosition() {
    return new Position(this.positionX, this.positionY);
  }

  getTemplate() {
    const btn = document.createElement("button");
    btn.id = `${this.id}`;
    btn.type = "button";
    btn.classList.add(this.letterBoxClass);
    btn.textContent = `${this.letter}`;

    return btn;
  }

  clone() {
    this.clones++;

    const element = document.createElement("button");
    element.type = "button";
    element.id = `clone-letter-button-${this.letter}${this.clones}`;
    element.classList.add(this.letterBoxClass);
    element.textContent = this.letter;

    return element;
  }

  cloneElement() {
    const clone = this.clone();
    this.game.spacesElement.appendChild(clone);
    const cloneElement = document.getElementById(
      `clone-letter-button-${this.letter}${this.clones}`
    );

    return cloneElement;
  }

  click(event) {
    if (!this._active) return;
    this.game.play(this);
  }

  initEventHandler() {
    this.element.addEventListener("click", (event) => {
      this.click();
    });
  }

  ready() {
    this.initEventHandler();
  }
}
