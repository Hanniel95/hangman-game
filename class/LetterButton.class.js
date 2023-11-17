class LetterButton extends DOMElement {
  static DISABLED_CLASS = "disabled";
  static LETTER_BOX_CLASS = "letter-box";
  static CLONE_ID_FORMAT = "clone-letter-button-%s%s";

  #letter;
  #active;
  #game;
  #clones;

  constructor(letter) {
    super();

    this.#letter = letter;
    this.#active = true;
    this.#clones = 0;
  }

  get game() {
    return this.#game;
  }

  set game(game) {
    this.#game = game;
  }

  get letter() {
    return this.#letter;
  }

  set active(value) {
    this.#active = value;
    this.element.classList.toggle(this.disabledClass, !value);
  }

  get active() {
    return this.#active;
  }

  get disabledClass() {
    return LetterButton.DISABLED_CLASS;
  }

  get letterBoxClass() {
    return LetterButton.LETTER_BOX_CLASS;
  }

  get id() {
    return `letter-button-${this.letter}`;
  }

  get element() {
    return document.getElementById(this.id);
  }

  getTemplate() {
    const btn = document.createElement("button");
    btn.id = this.id;
    btn.type = "button";
    btn.classList.add(this.letterBoxClass);
    btn.textContent = this.letter;
    return btn;
  }

  clone() {
    this.#clones++;
    const cloneId = LetterButton.CLONE_ID_FORMAT.replace(
      "%s",
      this.letter
    ).replace("%s", this.#clones);

    const element = document.createElement("button");
    element.type = "button";
    element.id = cloneId;
    element.classList.add(this.letterBoxClass);
    element.textContent = this.letter;

    return element;
  }

  cloneElement() {
    const clone = this.clone();
    this.game.spacesElement.appendChild(clone);
    return document.getElementById(clone.id);
  }

  click() {
    if (!this.#active) return;
    this.game.play(this);
  }

  initEventHandler() {
    this.element.addEventListener("click", this.click.bind(this));
  }

  ready() {
    this.initEventHandler();
  }
}
