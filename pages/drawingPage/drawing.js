import { API_BASE_URL } from "../../public/utils.js";
const idToken = sessionStorage.getItem("idToken");
var alreadyPlay;
showLoader();

// get true if user alrady palyed in this challenge, false otherwise
fetch(`${API_BASE_URL}/User/ParticipatedInChallenge`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ idToken: idToken }),
})
  .then((response) => response.json())
  .then((data) => {
    const responseBody =
      typeof data.body === "string" ? JSON.parse(data.body) : data.body;

    if (responseBody.participated === true) {
      alreadyPlay = true;
    } else {
      alreadyPlay = false;
    }
  })
  .catch((err) => {
    console.error("Error checking participation:", err);
    alert("Failed to check participation. Please try again.");
  })
  .finally(() => {
    hideLoader();
  });

document.addEventListener("DOMContentLoaded", () => {
  const challengeNameElement = document.getElementById("challenge-name");

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
  const challengeName = sessionStorage.getItem("dailyChallengeTitle");

  const saveButton = document.getElementById("save");
  const submitButton = document.getElementById("submit-btn");
  const backEditButton = document.getElementById("back-edit-btn");

  let lastX = null;
  let lastY = null;
  let drawing = false;
  let currentBrush = "line";
  let brushSize = 10;
  let erasing = false;
  let color = "#000000";
  let hue = 0;
  let lastDotTime = 0;

  challengeNameElement.textContent = challengeName;

  startButton.addEventListener("click", () => {
    if (!alreadyPlay) {
      preStartDrawingSection.style.opacity = "0";
      preStartDrawingSection.style.display = "none";
      drawingSection.style.display = "flex";
      drawingSection.style.opacity = "1";
      document.getElementById("title-challenge-2").textContent = challengeName;
    } else {
      showPopupCantDraw();
    }
  });

  // Open confirmation popup when clicking save
  saveButton.addEventListener("click", showPopupConfirm);

  // Handle Submit (actual save)
  submitButton.addEventListener("click", () => {
    hidePopupConfirm();
    showLoader();
    saveDrawing();
  });

  // Handle Back to Edit button
  backEditButton.addEventListener("click", hidePopupConfirm);

  // Canvas Drawing Functionality
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

  // Draw on Canvas
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

  // Save the Drawing to the Database
  function saveDrawing() {
    const image = canvas.toDataURL("image/png");
    const idToken = sessionStorage.getItem("idToken");
    const challengeId = sessionStorage.getItem("dailyChallengeId");

    if (!idToken || !challengeId) {
      alert("User is not authenticated or challenge ID is missing.");
      hideLoader();
      return;
    }

    fetch(`${API_BASE_URL}/Doodles/SaveDoodle`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idToken: idToken,
        challengeId: challengeId,
        imageData: image.replace(/^data:image\/png;base64,/, ""),
      }),
    })
      .then((response) => {
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        console.log("Drawing saved successfully:", data);
        hideLoader();
        showPopupSuccess();
      })
      .catch((err) => {
        console.error("Error saving drawing:", err);
        alert("Failed to save drawing. Please try again.");
        hideLoader();
      });
  }
});

// Show Confirmation Popup
function showPopupConfirm() {
  document.getElementById("popup-2").style.display = "flex";
  document.getElementById("overlay").style.display = "block";
}

// Hide Confirmation Popup
function hidePopupConfirm() {
  document.getElementById("popup-2").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}

// Show Success Popup
function showPopupSuccess() {
  const popup = document.getElementById("popup");
  const overlay = document.getElementById("overlay");
  const cancelButton = document.getElementById("cancel-btn");

  popup.style.display = "flex";
  overlay.style.display = "block";

  cancelButton.addEventListener("click", () => {
    popup.style.display = "none";
    overlay.style.display = "none";
    window.location.href = "../profilePage/index.html"; // Redirect after closing success popup
  });

  overlay.addEventListener("click", () => {
    popup.style.display = "none";
    overlay.style.display = "none";
    window.location.href = "../profilePage/index.html"; // Redirect after closing success popup
  });
}
// Show cant draw Popup
function showPopupCantDraw() {
  const popup = document.getElementById("popup-no-draw");
  const overlay = document.getElementById("overlay");
  const cancelButton = document.getElementById("cancel-btn-0");

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
