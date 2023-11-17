class SpaceItem extends DOMElement {
  #index;
  #game;

  constructor(index) {
    super();
    this.#index = index;
  }

  get index() {
    return this.#index;
  }

  get game() {
    return this.#game;
  }

  set game(game) {
    this.#game = game;
  }

  get id() {
    return `space-item-${this.index}`;
  }

  getTemplate() {
    const elem = document.createElement("div");
    elem.id = `${this.id}`;
    elem.classList.add("space-item");

    return elem;
  }

  get element() {
    return document.getElementById(this.id);
  }

  ready() {}
}
