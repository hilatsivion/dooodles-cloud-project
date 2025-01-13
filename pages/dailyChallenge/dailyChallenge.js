document.addEventListener("DOMContentLoaded", () => {
  showLoader();

  // get all drawings in the current challenge
  fetch("/api/dailyChallenge/getDrawings")
    .then((response) => response.json())
    .then((data) => {
      const challengeName = document.getElementById("challenge-name");
      const drawingGallery = document.querySelector(".drawing-gallery");
      const loggedInUser = localStorage.getItem("username");

      challengeName.textContent = data.challengeName || "Current Challenge";

      data.drawings.forEach((drawing) => {
        const card = document.createElement("div");
        card.classList.add("drawing-card");

        const isRated = drawing.ratedBy.includes(loggedInUser);

        card.innerHTML = `
          <img src="${drawing.imageUrl}" alt="Drawing by ${
          drawing.username
        }" class="drawing-img" />
          <div class="flex-space">
            <div class="username">${drawing.username}</div>
            <button class="rate-btn" data-username="${drawing.username}" ${
          isRated
            ? 'disabled style="background-color: grey; cursor: not-allowed;"'
            : ""
        }>${isRated ? "Rated" : "Rate"}</button>
          </div>
        `;

        drawingGallery.appendChild(card);
      });
      hideLoader();
      enableRating();
    })
    .catch((err) => {
      console.error("Error fetching drawings:", err);
      alert("Failed to load drawings. Please try again.");
      hideLoader();
    });
});

// enable rating only if the user is logged in and the user not rated the drwaing already
function enableRating() {
  const rateButtons = document.querySelectorAll(".rate-btn");
  const popup = document.getElementById("popup");
  const overlay = document.getElementById("overlay");
  const popupImg = document.getElementById("popup-img");
  const ratingSlider = document.getElementById("rating-slider");
  const sliderValue = document.getElementById("slider-value");
  const saveButton = document.getElementById("save-btn");
  const cancelButton = document.getElementById("cancel-btn");
  let selectedUsername = "";

  rateButtons.forEach((button) => {
    button.addEventListener("click", () => {
      selectedUsername = button.getAttribute("data-username");
      popupImg.src = button.previousElementSibling.src;
      popup.style.display = "flex";
      overlay.style.display = "block";
    });
  });

  ratingSlider.addEventListener("input", () => {
    sliderValue.textContent = ratingSlider.value;
  });

  saveButton.addEventListener("click", () => {
    const rating = ratingSlider.value;
    const loggedInUser = localStorage.getItem("username");

    // send to server the rate of the drawing by the logged user
    fetch("/api/dailyChallenge/rateDrawing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: selectedUsername,
        rater: loggedInUser,
        rating: rating,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        // Rating submitted!
        popup.style.display = "none";
        overlay.style.display = "none";
        location.reload(); // Refresh to update rated state
      })
      .catch((err) => {
        console.error("Error submitting rating:", err);
        alert("Failed to submit rating. Please try again.");
      });
  });

  cancelButton.addEventListener("click", () => {
    popup.style.display = "none";
    overlay.style.display = "none";
  });

  overlay.addEventListener("click", () => {
    popup.style.display = "none";
    overlay.style.display = "none";
  });
}
