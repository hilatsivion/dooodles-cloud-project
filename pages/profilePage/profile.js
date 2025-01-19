import { API_BASE_URL } from "../../public/utils.js";

document.addEventListener("DOMContentLoaded", () => {
  showLoader();
  const username = sessionStorage.getItem("username");
  const idToken = sessionStorage.getItem("idToken");

  // Correct GET request with idToken in query params
  fetch(`${API_BASE_URL}/User?idToken=${idToken}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const responseBody =
        typeof data.body === "string" ? JSON.parse(data.body) : data.body;
      const userData = responseBody.user;

      const usernameElement = document.getElementById("username");
      const userPointsElement = document.getElementById("user-points");
      const doodleCardsContainer = document.getElementById(
        "doodle-cards-container"
      );
      const noDoodlesMessage = document.getElementById("no-doodles-message");

      // Set user's profile information
      usernameElement.textContent = username;
      userPointsElement.innerHTML = `${userData.TotalScore.toFixed(
        2
      )} <span class="diamond">💎</span>`;
      console.log("====================================");
      console.log(userData);
      console.log("====================================");
      if (userData.Doodles && userData.Doodles.length > 0) {
        noDoodlesMessage.style.display = "none";

        userData.Doodles.forEach((doodle) => {
          const card = document.createElement("div");
          card.classList.add("doodle-card");
          card.innerHTML = `
            <img src="${doodle.ImageUrl}" alt="${doodle.ChallengeDescription}">
            <div class="info-card">
              <h4>${doodle.ChallengeDescription}</h4>
              <p>Average Score: ${parseFloat(doodle.AverageScore).toFixed(
                1
              )}</p>
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
