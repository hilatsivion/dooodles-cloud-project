import { API_BASE_URL } from "../../public/utils.js";

document.addEventListener("DOMContentLoaded", () => {
  showLoader();

  const challengeNameElement = document.getElementById("challenge-name");
  const drawingGallery = document.querySelector(".drawing-gallery");
  const idToken = sessionStorage.getItem("idToken"); // Use idToken for authentication
  const username = sessionStorage.getItem("username"); // Get logged-in username
  const isLoggedIn = !!idToken; // Check login status

  // Set the daily challenge title from sessionStorage
  const storedChallengeName =
    sessionStorage.getItem("dailyChallengeTitle") || "Current Challenge";
  challengeNameElement.textContent = storedChallengeName;

  // Fetch all drawings for the current challenge
  fetch(`${API_BASE_URL}/Challenge/Today`)
    .then((response) => response.json())
    .then((data) => {
      const challengeData =
        typeof data.body === "string" ? JSON.parse(data.body) : data.body;

      // Update the challenge title if available
      if (challengeData.challenge && challengeData.challenge.Description) {
        challengeNameElement.textContent = challengeData.challenge.Description;
      }

      const participants = challengeData.challenge.Participants;

      if (participants && participants.length > 0) {
        participants.forEach((participant) => {
          const card = document.createElement("div");
          card.classList.add("drawing-card");

          const isRated =
            participant.ratedBy && participant.ratedBy.includes(username);

          const isOwnDrawing =
            participant.Username && participant.Username === username;

          const isDisabled = !isLoggedIn || isRated || isOwnDrawing;

          card.innerHTML = `
            <img src="${participant.Location}" alt="Drawing by ${
            participant.Username || "Unknown"
          }" class="drawing-img" />
            <div class="flex-space">
              <div class="username">${participant.Username || "Anonymous"}</div>
              <button class="rate-btn" data-doodle-id="${
                participant.DoodleId
              }" ${
            isDisabled
              ? 'disabled style="background-color: #B9B2B0; cursor: not-allowed;"'
              : ""
          }>
                ${
                  !isLoggedIn
                    ? "Log in to Rate"
                    : isOwnDrawing
                    ? "Your Drawing"
                    : isRated
                    ? "Rated"
                    : "Rate"
                }
              </button>
            </div>
          `;

          drawingGallery.appendChild(card);
        });
      } else {
        drawingGallery.innerHTML =
          "<p>No drawings found for this challenge.</p>";
      }

      hideLoader();
      enableRating();
    })
    .catch((err) => {
      console.error("Error fetching drawings:", err);
      alert("Failed to load drawings. Please try again.");
      hideLoader();
    });
});

// Enable rating only if the user is logged in and hasn't rated the drawing
function enableRating() {
  const rateButtons = document.querySelectorAll(".rate-btn");
  const popup = document.getElementById("popup");
  const overlay = document.getElementById("overlay");
  const popupImg = document.getElementById("popup-img");
  const ratingSlider = document.getElementById("rating-slider");
  const sliderValue = document.getElementById("slider-value");
  const saveButton = document.getElementById("save-btn");
  const cancelButton = document.getElementById("cancel-btn");
  const idToken = sessionStorage.getItem("idToken");
  let selectedDoodleId = "";

  rateButtons.forEach((button) => {
    if (!button.disabled && idToken) {
      button.addEventListener("click", () => {
        selectedDoodleId = button.getAttribute("data-doodle-id");
        popupImg.src = button
          .closest(".drawing-card")
          .querySelector(".drawing-img").src;
        popup.style.display = "flex";
        overlay.style.display = "block";
      });
    }
  });

  ratingSlider.addEventListener("input", () => {
    sliderValue.textContent = ratingSlider.value;
  });

  saveButton.addEventListener("click", () => {
    const score = parseInt(ratingSlider.value); // Ensure the score is an integer
    showLoader();

    fetch(`${API_BASE_URL}/Doodles/Score`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: idToken, // Authentication token
        doodleId: selectedDoodleId, // Doodle ID
        score: score, // Rating score
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        hideLoader();
        console.log("Parsed Response Body:", data); // Debugging output
        document.getElementById("rating-slider").value = 1;
        document.getElementById("slider-value").innerHTML = 1;

        // Check if the 'error' exists in the response
        let responseBody;
        try {
          responseBody =
            typeof data.body === "string" ? JSON.parse(data.body) : data.body;
        } catch (e) {
          console.error("Failed to parse body:", e);
          responseBody = {};
        }

        // Check for the specific error message
        if (responseBody.error === "You have already scored this doodle") {
          popup.style.display = "none";
          overlay.style.display = "none";
          showPopupScored(); // Show the popup if already rated
        } else if (data.statusCode === 400) {
          alert(`Error: ${responseBody.error || "Failed to submit rating."}`);
        } else {
          console.log("Rating submitted successfully:", responseBody);
          popup.style.display = "none";
          overlay.style.display = "none";
        }
      })
      .catch((err) => {
        console.error("Error submitting rating:", err);
        alert("Failed to submit rating. Please try again.");
      });
  });

  cancelButton.addEventListener("click", () => {
    document.getElementById("rating-slider").value = 1;
    document.getElementById("slider-value").innerHTML = 1;
    popup.style.display = "none";
    overlay.style.display = "none";
  });

  overlay.addEventListener("click", () => {
    popup.style.display = "none";
    overlay.style.display = "none";
  });
}

// Show Success Popup
function showPopupScored() {
  const popup = document.getElementById("popup-scored");
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
