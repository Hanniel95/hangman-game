function initButtonFocusBehaviour() {
  const buttons = document.getElementsByClassName("letter-box");

  for (let index = 0; index < buttons.length; index++) {
    const element = buttons[index];
    element.addEventListener("mousedown", function () {
      element.classList.add("focus");
    });

    element.addEventListener("mouseup", function () {
      element.classList.remove("focus");
    });
  }
}
