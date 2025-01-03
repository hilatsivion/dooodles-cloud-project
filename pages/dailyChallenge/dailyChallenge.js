document.addEventListener("DOMContentLoaded", () => {
  // use a function like this to fetch the data and handle the loader. the function located in loader
  // fetchData()
  showLoader(); // for now

  // Simulate fetching drawing data (Replace this with actual data fetch from server)
  const drawings = [
    {
      username: "User123",
      imageUrl: "../../assets/images/doodle-placeholder.jpg",
    },
    {
      username: "User234",
      imageUrl: "../../assets/images/doodle-placeholder.jpg",
    },
    {
      username: "Alony",
      imageUrl: "../../assets/images/doodle-placeholder.jpg",
    },
    {
      username: "Gad123",
      imageUrl: "../../assets/images/doodle-placeholder.jpg",
    },
    { username: "God", imageUrl: "../../assets/images/doodle-placeholder.jpg" },
    {
      username: "User456",
      imageUrl: "../../assets/images/doodle-placeholder.jpg",
    },
  ];

  const challengeName = document.getElementById("challenge-name");
  const drawingGallery = document.querySelector(".drawing-gallery");

  // Set the challenge name (can be dynamically set from the server)
  challengeName.textContent = "Dog walks on the moon"; // Example challenge name

  // Create the drawing cards dynamically
  drawings.forEach((drawing) => {
    const card = document.createElement("div");
    card.classList.add("drawing-card");

    card.innerHTML = `
        <img src="${drawing.imageUrl}" alt="Drawing by ${drawing.username}" class="drawing-img" />
        <div class="flex-space">
        <div class="username">${drawing.username}</div>
        <button class="rate-btn" data-img="${drawing.imageUrl}" data-username="${drawing.username}">Rate</button>
        </div>
      `;

    drawingGallery.appendChild(card);
  });

  // Get the popup elements
  const popup = document.getElementById("popup");
  const overlay = document.getElementById("overlay");
  const popupImg = document.getElementById("popup-img");
  const popupChallenge = document.getElementById("popup-challenge");
  const ratingSlider = document.getElementById("rating-slider");
  const sliderValue = document.getElementById("slider-value");
  const saveButton = document.getElementById("save-btn");
  const cancelButton = document.getElementById("cancel-btn");

  // Handle Rate button click
  const rateButtons = document.querySelectorAll(".rate-btn");
  rateButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Set the image and challenge name in the popup
      const imageSrc = button.getAttribute("data-img");
      const username = button.getAttribute("data-username");
      popupImg.src = imageSrc;
      popupChallenge.textContent = "Dog walks on the moon"; // Can be dynamic from the server

      // Show the popup and overlay
      popup.style.display = "flex";
      overlay.style.display = "block";
    });
  });

  // Update the slider value
  ratingSlider.addEventListener("input", () => {
    sliderValue.textContent = ratingSlider.value;
  });

  // Save the rating or close the popup
  saveButton.addEventListener("click", () => {
    alert(`Rated: ${ratingSlider.value}`); // Save logic (e.g., to a server) can be added here
    popup.style.display = "none";
    overlay.style.display = "none";
  });

  cancelButton.addEventListener("click", () => {
    popup.style.display = "none";
    overlay.style.display = "none";
  });

  // Close the popup when clicking outside (on the overlay)
  overlay.addEventListener("click", () => {
    popup.style.display = "none";
    overlay.style.display = "none";
  });
});
