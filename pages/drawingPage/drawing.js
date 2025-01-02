document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("start-button");
  const preStartDrawingSection = document.querySelector(".pre-start-drawing");
  const drawingSection = document.querySelector(".drawing");

  startButton.addEventListener("click", () => {
    // Fade out the pre-start-drawing section
    preStartDrawingSection.style.opacity = "0";

    preStartDrawingSection.style.display = "none";
    drawingSection.style.display = "flex";
    drawingSection.style.opacity = "1";
  });
});
