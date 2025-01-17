import { API_BASE_URL } from "../../public/utils.js";

document.addEventListener("DOMContentLoaded", () => {
  showLoader();

  const challengeName = document.getElementById("challenge-name");
  const leaderboardContainer = document.getElementById("leaderboard-container");

  // Set the daily challenge title from sessionStorage
  challengeName.textContent =
    sessionStorage.getItem("dailyChallengeTitle") || "Current Challenge";

  const challengeId = sessionStorage.getItem("dailyChallengeId");

  // Fetch the Top 5 Users
  fetch(`${API_BASE_URL}/Challenge/Top5Users?challengeId=${challengeId}`, {
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
      console.log("Top 5 Users Data:", data);

      // Parse the body if it's a string
      const responseBody =
        typeof data.body === "string" ? JSON.parse(data.body) : data.body;
      const topUsersData = responseBody.topUsers;

      // Clear the leaderboard container
      leaderboardContainer.innerHTML = "";

      // Check if data exists and loop through top 5 users
      if (topUsersData && topUsersData.length > 0) {
        topUsersData.forEach((user, index) => {
          const userItem = document.createElement("div");
          userItem.classList.add("leaderboard-item");

          userItem.innerHTML = `
          <div class="place">${user.Place}</div>
          <div class="username">${user.userEmail}</div>
          <div class="place">${user.Place}</div>
        `;

          leaderboardContainer.appendChild(userItem);
        });
      } else {
        leaderboardContainer.innerHTML = "<p>No top users found.</p>";
      }

      hideLoader();
    })
    .catch((err) => {
      console.error("Error fetching top users:", err);
      alert("Failed to load leaderboard. Please try again.");
      hideLoader();
    });
});
