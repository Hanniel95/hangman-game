/**
 * Handles movement animations for HTML elements.
 * @class
 */
class Movement {
  /**
   * Moves an element from one position to another using animation.
   * @param {HTMLElement} element - The HTML element to be moved.
   * @param {Position} from - The starting position.
   * @param {Position} to - The ending position.
   * @param {number} duration - The duration of the animation in milliseconds.
   * @returns {Promise<void>} - A Promise that resolves when the animation is complete.
   */
  goToPosition(
    element,
    from = new Position(0, 0),
    to = new Position(0, 0),
    duration = 500
  ) {
    return new Promise((resolve) => {
      const cloneElement = element;

      const startTime = performance.now();

      const { x: startX, y: startY } = from;
      const { x: endX, y: endY } = to;

      // At start, the cloned element must be at the original element position
      cloneElement.style.left = startX + "px";
      cloneElement.style.top = startY + "px";
      cloneElement.style.position = "absolute";

      /**
       * Animates the movement.
       * @param {number} currentTime - The current time during the animation.
       */
      function animate(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);

        const deltaX = endX - startX;
        const deltaY = endY - startY;

        cloneElement.style.top = `${startY + progress * deltaY}px`;
        cloneElement.style.left = `${startX + progress * deltaX}px`;

        if (progress < 1) {
          requestAnimationFrame(animate.bind(this));
        } else {
          resolve();
        }
      }

      requestAnimationFrame(animate.bind(this));
    });
  }

  /**
   * Returns an element to its original position after click on it at space position
   * @param {HTMLElement} element - The HTML element to be returned.
   * @param {Position} from - The starting position.
   * @param {Position} to - The ending position.
   * @param {number} duration - The duration of the animation in milliseconds.
   * @returns {Promise<void>} - A Promise that resolves when the animation is complete.
   */
  async returnToPosition(
    element,
    from = new Position(0, 0),
    to = new Position(0, 0),
    duration = 500
  ) {
    const animation = () =>
      new Promise((resolve) => {
        const cloneElement = element;

        const startTime = performance.now();

        const { x: startX, y: startY } = from;
        const { x: endX, y: endY } = to;

        // At start, the cloned element must be at the original element position
        cloneElement.style.left = startX + "px";
        cloneElement.style.top = startY + "px";
        cloneElement.style.position = "absolute";

        /**
         * Animates the return movement.
         * @param {number} currentTime - The current time during the animation.
         */
        function animate(currentTime) {
          const elapsedTime = currentTime - startTime;
          const progress = Math.min(elapsedTime / duration, 1);

          const deltaX = endX - startX;
          const deltaY = endY - startY;

          cloneElement.style.top = `${startY + progress * deltaY}px`;
          cloneElement.style.left = `${startX + progress * deltaX}px`;

          if (progress < 1) {
            requestAnimationFrame(animate.bind(this));
          } else {
            resolve();
          }
        }

        requestAnimationFrame(animate.bind(this));
      });

    // Wait for animation
    await animation();

    // Remove cloned element after animation
    element.parentNode.removeChild(element);
  }
}
