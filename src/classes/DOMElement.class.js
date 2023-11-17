class DOMElement {
  #element;

  constructor(element) {
    this.#element = element || document.createElement("div");
  }

  get element() {
    return this.#element;
  }

  set element(element) {
    this.#element = element;
  }

  get id() {
    return this.#element.id;
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
}
