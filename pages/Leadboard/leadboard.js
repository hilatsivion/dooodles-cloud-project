import { API_BASE_URL } from "../../public/utils.js";

document.addEventListener("DOMContentLoaded", () => {
  showLoader();

  // Changed GET to POST for fetching the daily challenge
  fetch(`${API_BASE_URL}/Challenge/Today`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((challengeData) => {
      const leaderboardContainer = document.getElementById(
        "leaderboard-container"
      );
      const challengeName = document.getElementById("challenge-name");

      console.log(challengeData);

      // Update daily challenge name
      challengeName.textContent =
        challengeData.challenge?.Description || "Current Challenge";

      // Fetch leaderboard data (assuming this is the correct endpoint)
      fetch(`${API_BASE_URL}/score-doodle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((leaderboardData) => {
          leaderboardData.entries.forEach((entry, index) => {
            const leaderboardItem = document.createElement("div");
            leaderboardItem.classList.add("leaderboard-item");

            leaderboardItem.innerHTML = `
              <div class="place">${index + 1}</div>
              <div class="username">${entry.username}</div>
              <div class="score">${entry.score}</div>
            `;

            leaderboardContainer.appendChild(leaderboardItem);
          });
          hideLoader();
        })
        .catch((err) => {
          console.error("Error fetching leaderboard data:", err);
          alert("Failed to load leaderboard data. Please try again.");
          hideLoader();
        });
    })
    .catch((err) => {
      console.error("Error fetching challenge data:", err);
      alert("Failed to load challenge data. Please try again.");
      hideLoader();
    });
});
