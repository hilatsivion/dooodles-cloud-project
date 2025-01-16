import { API_BASE_URL } from "../../public/utils.js";

document.addEventListener("DOMContentLoaded", () => {
  showLoader();
  const username = sessionStorage.getItem("username");

  // Send a POST request with the logged-in user's username
  fetch(`${API_BASE_URL}/Doodles/UserId`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ idToken: sessionStorage.getItem("idToken") }), // Sending the username in the request body
  })
    .then((response) => response.json())
    .then((data) => {
      const usernameElement = document.getElementById("username");
      const userPointsElement = document.getElementById("user-points");
      const doodleCardsContainer = document.getElementById(
        "doodle-cards-container"
      );
      const noDoodlesMessage = document.getElementById("no-doodles-message");

      // Set user's profile information
      usernameElement.textContent = username;
      userPointsElement.innerHTML = `${data.points} <span class="diamond">💎</span>`;

      if (data.doodles && data.doodles.length > 0) {
        noDoodlesMessage.style.display = "none";

        data.doodles.forEach((doodle) => {
          const card = document.createElement("div");
          card.classList.add("doodle-card");
          card.innerHTML = `
            <img src="${doodle.imageUrl}" alt="${doodle.challengeName}">
            <div class="info-card">
              <h4>${doodle.challengeName}</h4>
              <p>Average Score: ${doodle.averageScore.toFixed(1)}</p>
            </div>
          `;
          doodleCardsContainer.appendChild(card);
        });
      } else {
        doodleCardsContainer.style.display = "none";
        noDoodlesMessage.style.display = "flex";
      }
      hideLoader();
    })
    .catch((err) => {
      console.error("Error fetching profile data:", err);
      alert("Failed to load profile data. Please try again.");
      hideLoader();
    });
});
