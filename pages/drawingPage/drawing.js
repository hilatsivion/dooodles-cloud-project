import { API_BASE_URL } from "../../public/utils.js";
document.addEventListener("DOMContentLoaded", () => {
  const challengeNameElement = document.getElementById("challenge-name");
  const drawingChallengeTitle = document.getElementById("drawing-challenge");

  const startButton = document.getElementById("start-button");
  const preStartDrawingSection = document.querySelector(".pre-start-drawing");
  const drawingSection = document.querySelector(".drawing");
  const canvas = document.getElementById("drawingCanvas");
  const ctx = canvas.getContext("2d");
  const brushButtons = document.querySelectorAll(".brush");
  const brushSizeInput = document.getElementById("brush-size");
  const eraserButton = document.getElementById("eraser");
  const clearButton = document.getElementById("clear");
  const colorPicker = document.getElementById("color-picker");

  let lastX = null;
  let lastY = null;
  let drawing = false;
  let currentBrush = "line";
  let brushSize = 10;
  let erasing = false;
  let color = "#000000";
  let hue = 0;
  let lastDotTime = 0;

  fetch(`${API_BASE_URL}`)
    .then((response) => response.json())
    .then((data) => {
      challengeNameElement.textContent = data.challengeName;
      drawingChallengeTitle.textContent = data.challengeName;
    })
    .catch((err) => {
      console.error("Error fetching challenge:", err);
      challengeNameElement.textContent = "Failed to load challenge";
    });

  startButton.addEventListener("click", () => {
    preStartDrawingSection.style.opacity = "0";
    preStartDrawingSection.style.display = "none";
    drawingSection.style.display = "flex";
    drawingSection.style.opacity = "1";
  });

  document.getElementById("save").addEventListener("click", saveDrawing);

  // functinallity of canvas
  canvas.addEventListener("mousedown", () => (drawing = true));

  canvas.addEventListener("mouseup", () => {
    drawing = false;
    lastX = null;
    lastY = null;
  });

  canvas.addEventListener("mouseleave", () => {
    drawing = false;
    lastX = null;
    lastY = null;
  });
  canvas.addEventListener("mousemove", draw);

  brushButtons.forEach((button) => {
    button.addEventListener("click", () => {
      brushButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      currentBrush = button.dataset.brush;
      erasing = false;
    });
  });

  brushSizeInput.addEventListener("input", (e) => {
    brushSize = e.target.value;
  });

  eraserButton.addEventListener("click", () => {
    erasing = true;
    brushButtons.forEach((btn) => btn.classList.remove("active"));
  });

  clearButton.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

  colorPicker.addEventListener("input", (e) => {
    color = e.target.value;
  });

  // draw on the canvas
  function draw(event) {
    if (!drawing) return;

    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) * (canvas.width / rect.width);
    const y = (event.clientY - rect.top) * (canvas.height / rect.height);

    if (erasing) {
      ctx.clearRect(x - brushSize / 2, y - brushSize / 2, brushSize, brushSize);
      return;
    }

    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";

    if (currentBrush === "rainbow") {
      hue += 5;
      ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
      if (lastX !== null && lastY !== null) {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();
      }
    } else if (currentBrush === "dots") {
      ctx.fillStyle = color;

      const dotInterval = brushSize * 2;
      const currentTime = Date.now();

      if (currentTime - lastDotTime >= dotInterval) {
        ctx.beginPath();
        ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
        ctx.fill();

        lastDotTime = currentTime;
        lastX = x;
        lastY = y;
      }
    } else if (currentBrush === "line") {
      ctx.strokeStyle = color;
      if (lastX !== null && lastY !== null) {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();
      }
    } else if (currentBrush === "spray") {
      ctx.fillStyle = color;
      for (let i = 0; i < 10; i++) {
        const offsetX = Math.random() * brushSize - brushSize / 2;
        const offsetY = Math.random() * brushSize - brushSize / 2;
        ctx.fillRect(x + offsetX, y + offsetY, 1, 1);
      }
    }

    lastX = x;
    lastY = y;
  }

  // save the drawing to db
  function saveDrawing() {
    const image = canvas.toDataURL("image/png");
    const challengeName = document.getElementById("challenge-name").textContent;
    const username = localStorage.getItem("username");

    fetch("/api/dailyChallenge/saveDrawing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        challengeName: challengeName,
        imageBase64: image.replace(/^data:image\/png;base64,/, ""),
      }),
    })
      .then((response) => response.json())
      .then(() => {
        // Drawing saved successfully!
        showPopup();
        window.location.href = "../homePage";
      })
      .catch((err) => {
        console.error("Error saving drawing:", err);
        alert("Failed to save drawing. Please try again.");
      });
  }

  // show the popup on save successfully
  function showPopup() {
    const popup = document.getElementById("popup");
    const overlay = document.getElementById("overlay");
    const cancelButton = document.getElementById("cancel-btn");

    popup.style.display = "flex";
    overlay.style.display = "block";

    cancelButton.addEventListener("click", () => {
      popup.style.display = "none";
      overlay.style.display = "none";
    });

    overlay.addEventListener("click", () => {
      popup.style.display = "none";
      overlay.style.display = "none";
    });
  }
});
