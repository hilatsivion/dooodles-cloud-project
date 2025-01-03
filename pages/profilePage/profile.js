document.addEventListener("DOMContentLoaded", async () => {
  // use a function like this to fetch the data and handle the loader. the function located in loader
  // fetchData()
  showLoader(); // for now

  const userData = {
    username: "User123", // From DynamoDB
    points: 53, // From DynamoDB
    doodles: [], // Will populate with images and random data
  };

  const randomSentences = [
    "A funny cat on the beach",
    "A dog chasing butterflies",
    "A peaceful mountain landscape",
    "A city skyline at dusk",
    "An abstract splash of colors",
    "A surreal underwater scene",
  ];

  function getRandomScore() {
    return (Math.random() * (10 - 5) + 5).toFixed(1); // Generates a score between 5 and 10
  }

  const images = await getAllImages();
  userData.doodles = images.map((image) => ({
    title: randomSentences[Math.floor(Math.random() * randomSentences.length)], // Random sentence
    score: getRandomScore(), // Random score
    image: image.imageBase64, // Base64 image
  }));

  // remove until here

  // Future implementation: Fetch user data from DynamoDB via API Gateway using Cognito token
  /*
  const apiEndpointUserData = "https://your-api-gateway-endpoint.amazonaws.com/prod/userdata";
  const userToken = localStorage.getItem("cognitoUserToken"); // Retrieve the Cognito token after login
  
  if (!userToken) {
    alert("User not authenticated. Please log in.");
    return;
  }

  try {
    const response = await fetch(apiEndpointUserData, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${userToken}`, // Pass Cognito token in the Authorization header
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch user data.");
    }

    const data = await response.json();
    userData.username = data.username; // Replace with actual user data from API
    userData.points = data.points; // Replace with actual points from API

  } catch (error) {
    console.error("Error fetching user data:", error);
    alert("An error occurred while fetching user data.");
    return;
  }
  */

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
          <div class="info-card">
          <h4>${doodle.title}</h4>
          <p>${doodle.score}</p>
          </div>
        `;
      doodleCardsContainer.appendChild(card);
    });
  } else {
    // No doodles found
    doodleCardsContainer.style.display = "none";
    noDoodlesMessage.style.display = "flex"; // Show the "No doodles yet" message
  }
});

async function getAllImages() {
  const images = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    // Check if the key starts with "final-drawing-"
    if (key.startsWith("final-drawing-")) {
      images.push({
        id: key, // Use the full key as the ID
        imageBase64: localStorage.getItem(key), // Get the Base64 image data
      });
    }
  }

  /*
  // Future Implementation: Fetch images via API Gateway with Cognito Authentication
  async function fetchUserData() {
    const apiEndpointUserData = "https://your-api-gateway-endpoint.amazonaws.com/prod/userdata";
    const userToken = localStorage.getItem("cognitoUserToken"); // Retrieve the Cognito token after login
    
    if (!userToken) {
      alert("User not authenticated. Please log in.");
      return null;
    }

    try {
      const response = await fetch(apiEndpointUserData, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${userToken}`, // Pass Cognito token in the Authorization header
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch user data.");
      }

      const data = await response.json();
      return data; // Return the user data from API

    } catch (error) {
      console.error("Error fetching user data:", error);
      alert("An error occurred while fetching user data.");
      return null;
    }
  }
  */

  return images;
}
