document.addEventListener("DOMContentLoaded", () => {
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

  startButton.addEventListener("click", () => {
    preStartDrawingSection.style.opacity = "0";
    preStartDrawingSection.style.display = "none";
    drawingSection.style.display = "flex";
    drawingSection.style.opacity = "1";
  });

  document.getElementById("save").addEventListener("click", () => {
    saveDrawing(); // Save the drawing
    window.location.href = "../homePage";
  });
  

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
    
      const dotInterval = brushSize*2; 
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

  function saveDrawing() {
    // Set a white background if the canvas is empty or has transparency
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;

    // Set white background
    tempCtx.fillStyle = "#FFFFFF"; 
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

    // Draw the existing canvas content over the white background
    tempCtx.drawImage(canvas, 0, 0);

    // Save the canvas as PNG
    const image = tempCanvas.toDataURL("image/png"); // Ensure it's PNG with the background

    const timestamp = Date.now();
    localStorage.setItem(`final-drawing-${timestamp}`, image); // Save with a unique key
    alert("Drawing saved locally as a PNG image!");

    /*
    // Future Implementation: Upload the image to AWS S3 via API Gateway with Cognito Authentication
    const apiEndpoint = "https://your-api-gateway-endpoint.amazonaws.com/prod/upload";
    const imageData = {
      name: `drawing-${timestamp}`, // Name of the drawing
      imageBase64: image.replace(/^data:image\/png;base64,/, "") // Remove base64 prefix
    };
  
    // Retrieve Cognito user token (replace with actual method to get the token)
    const userToken = localStorage.getItem("cognitoUserToken"); // Example: stored during login
  
    if (!userToken) {
      alert("User not authenticated. Please log in.");
      return;
    }
  
    fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${userToken}` // Pass Cognito user token in the Authorization header
      },
      body: JSON.stringify(imageData)
    })
    .then((response) => {
      if (response.ok) {
        alert("Drawing successfully uploaded to S3!");
      } else {
        return response.json().then((errorData) => {
          throw new Error(errorData.message || "Failed to upload the drawing.");
        });
      }
    })
    .catch((error) => {
      console.error("Error uploading drawing:", error);
      alert("An error occurred while uploading the drawing.");
    });
    */
}

  
  
});


