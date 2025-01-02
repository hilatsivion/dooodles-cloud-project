document.addEventListener("DOMContentLoaded", () => {
  // Simulate fetching leaderboard data (Replace this with actual server data fetch)
  const leaderboardData = [
    { rank: 1, username: "User123", score: 1 },
    { rank: 2, username: "User234", score: 2 },
    { rank: 3, username: "Alony", score: 3 },
    { rank: 4, username: "Gad123", score: 4 },
    { rank: 5, username: "God", score: 5 },
  ];

  // Display the leaderboard
  const leaderboardContainer = document.getElementById("leaderboard-container");
  const challengeName = document.getElementById("challenge-name");

  // Set the challenge name (you can replace this with data from the server)
  challengeName.textContent = "Dog walks on the moon";

  leaderboardData.forEach((entry) => {
    const leaderboardItem = document.createElement("div");
    leaderboardItem.classList.add("leaderboard-item");

    leaderboardItem.innerHTML = `
        <div class="rank">${entry.rank}</div>
        <div class="username">${entry.username}</div>
        <div class="score">${entry.score}</div>
      `;

    leaderboardContainer.appendChild(leaderboardItem);
  });
});
