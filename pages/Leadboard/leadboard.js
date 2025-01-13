document.addEventListener("DOMContentLoaded", () => {
  showLoader();
  fetch("/api/leaderboard/getData")
    .then((response) => response.json())
    .then((leaderboardData) => {
      const leaderboardContainer = document.getElementById(
        "leaderboard-container"
      );
      const challengeName = document.getElementById("challenge-name");

      // Set the challenge name dynamically if provided
      challengeName.textContent =
        leaderboardData.challengeName || "Current Challenge";

      leaderboardData.entries.forEach((entry) => {
        const leaderboardItem = document.createElement("div");
        leaderboardItem.classList.add("leaderboard-item");

        leaderboardItem.innerHTML = `
          <div class="place">${entry.place}</div>
          <div class="username">${entry.username}</div>
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
});
