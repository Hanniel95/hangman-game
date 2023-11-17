/**
 * Function to initialize button focus behavior
 */
function initButtonFocusBehaviour() {
  // Select all elements with the class "letter-box"
  const buttons = document.querySelectorAll(".letter-box");

  // Event handler for mouse down event
  const handleMouseDown = (event) => {
    event.currentTarget.classList.add("focus");
  };

  // Event handler for mouse up event
  const handleMouseUp = (event) => {
    event.currentTarget.classList.remove("focus");
  };

  // Attach event listeners to each "letter-box" element
  buttons.forEach((element) => {
    element.addEventListener("mousedown", handleMouseDown);
    element.addEventListener("mouseup", handleMouseUp);
  });
}
