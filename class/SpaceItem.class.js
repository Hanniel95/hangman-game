class SpaceItem {
  value;
  index;
  game;

  constructor(index) {
    this.index = index;
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

  get positionX() {
    return this.element.getBoundingClientRect().x;
  }

  get positionY() {
    return this.element.getBoundingClientRect().y;
  }

  getPosition() {
    return new Position(this.positionX, this.positionY);
  }

  ready() {}
}
