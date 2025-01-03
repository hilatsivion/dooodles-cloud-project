document.addEventListener("DOMContentLoaded", () => {
  // Simulate fetching drawing data (Replace this with actual data fetch from server)
  const drawings = [
    {
      username: "User123",
      imageUrl: "../../assets/images/doodle-placeholder.jpg",
    },
    {
      username: "User234",
      imageUrl: "../../assets/images/doodle-placeholder.jpg",
    },
    {
      username: "Alony",
      imageUrl: "../../assets/images/doodle-placeholder.jpg",
    },
    {
      username: "Gad123",
      imageUrl: "../../assets/images/doodle-placeholder.jpg",
    },
    { username: "God", imageUrl: "../../assets/images/doodle-placeholder.jpg" },
    {
      username: "User456",
      imageUrl: "../../assets/images/doodle-placeholder.jpg",
    },
  ];

  const challengeName = document.getElementById("challenge-name");
  const drawingGallery = document.querySelector(".drawing-gallery");

  // Set the challenge name (can be dynamically set from the server)
  challengeName.textContent = "Dog walks on the moon"; // Example challenge name

  // Create the drawing cards dynamically
  drawings.forEach((drawing) => {
    const card = document.createElement("div");
    card.classList.add("drawing-card");

    card.innerHTML = `
        <img src="${drawing.imageUrl}" alt="Drawing by ${drawing.username}" />
        <div class="flex-space">
        <div class="username">${drawing.username}</div>
        <button class="rate-btn">Rate</button>
        </div>
      `;

    drawingGallery.appendChild(card);
  });
});
