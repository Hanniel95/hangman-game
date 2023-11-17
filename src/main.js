window.addEventListener("DOMContentLoaded", function () {
  const game = new Game(
    ".game-spaces-container",
    ".game-keyboard-container",
    "#game-hangman-image"
  );

  game.initializeGame();
  // game.generateSpaceItems();

  this.window.game = game;

  initButtonFocusBehaviour();
});
