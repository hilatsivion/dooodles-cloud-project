document.addEventListener("DOMContentLoaded", () => {
  // Simulate fetching leaderboard data (Replace this with actual server data fetch)
  const leaderboardData = [
    { placerank: 1, username: "User123", place: 1 },
    { rank: 2, username: "User234", place: 2 },
    { rank: 3, username: "Alony", place: 3 },
    { rank: 4, username: "Gad123", place: 4 },
    { rank: 5, username: "God", place: 5 },
  ];

  // Display the leaderboard
  const leaderboardContainer = document.getElementById("leaderboard-container");
  const challengeName = document.getElementById("challenge-name");

  // Set the challenge name (you can replace this with data from the server)
  challengeName.textContent = "Sample Sample";

  leaderboardData.forEach((entry) => {
    const leaderboardItem = document.createElement("div");
    leaderboardItem.classList.add("leaderboard-item");

    leaderboardItem.innerHTML = `
        <div class="place">${entry.place}</div>
        <div class="username">${entry.username}</div>
        <div class="place">${entry.place}</div>
      `;

    leaderboardContainer.appendChild(leaderboardItem);
  });
});
