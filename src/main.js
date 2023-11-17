document.addEventListener("DOMContentLoaded", () => {
  // Initialize the game and store it in the 'game' variable
  const game = initializeGame();

  // Initialize button focus behavior
  initButtonFocusBehaviour();

  // Function to initialize the game
  function initializeGame() {
    // Create a new instance of the Game class with specific selectors
    const game = new Game(
      ".game-spaces-container",
      ".game-keyboard-container",
      "#game-hangman-image"
    );

    // Initialize the game
    game.initializeGame();

    // Return the game instance
    return game;
  }
});
