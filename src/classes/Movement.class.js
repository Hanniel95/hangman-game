class Movement {
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

      cloneElement.style.left = startX + "px";
      cloneElement.style.top = startY + "px";
      cloneElement.style.position = "absolute";

      const endX = to.x;
      const endY = to.y;

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

        const startX = from.x;
        const startY = from.y;

        cloneElement.style.left = startX + "px";
        cloneElement.style.top = startY + "px";
        cloneElement.style.position = "absolute";

        const endX = to.x;
        const endY = to.y;

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

    await animation();

    element.parentNode.removeChild(element);
  }
}
