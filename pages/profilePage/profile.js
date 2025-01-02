document.addEventListener("DOMContentLoaded", () => {
  //
  //
  //
  // TODO: we need to get from the server a json of data about the user - username, score, images.
  //
  //
  //
  // Simulating user data
  const userData = {
    username: "User123", // From DynamoDB
    points: 53, // From DynamoDB

    doodles: [
      // Simulated list of doodles
      {
        title: "Funny Cat in the Beach",
        score: 8.3,
        image: "path/to/doodle1.png",
      },
      {
        title: "Funny Cat in the Beach",
        score: 9,
        image: "path/to/doodle2.png",
      },
      {
        title: "Funny Cat in the Beach",
        score: 6,
        image: "path/to/doodle3.png",
      },
    ],
  };

  // Set the user's name and points
  const usernameElement = document.getElementById("username");
  const userPointsElement = document.getElementById("user-points");
  const doodleCardsContainer = document.getElementById(
    "doodle-cards-container"
  );
  const noDoodlesMessage = document.getElementById("no-doodles-message");

  usernameElement.textContent = userData.username;
  userPointsElement.innerHTML = `${userData.points} <span class="diamond">💎</span>`;

  // Check if there are any doodles
  if (userData.doodles && userData.doodles.length > 0) {
    // Show the doodles
    noDoodlesMessage.style.display = "none"; // Hide the "No doodles yet" message

    userData.doodles.forEach((doodle) => {
      const card = document.createElement("div");
      card.classList.add("doodle-card");
      card.innerHTML = `
          <img src="${doodle.image}" alt="${doodle.title}">
          <h3>${doodle.title}</h3>
          <p>Score: ${doodle.score}</p>
        `;
      doodleCardsContainer.appendChild(card);
    });
  } else {
    // No doodles found
    noDoodlesMessage.style.display = "block"; // Show the "No doodles yet" message
  }
});
