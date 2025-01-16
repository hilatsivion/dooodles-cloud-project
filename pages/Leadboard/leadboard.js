import { API_BASE_URL } from "../../public/utils.js";

document.addEventListener("DOMContentLoaded", () => {
  showLoader();

  // Fetch the daily challenge only
  fetch(`${API_BASE_URL}/Challenge/Today`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((challengeData) => {
      const challengeName = document.getElementById("challenge-name");

      // Update the daily challenge name
      challengeName.textContent =
        challengeData.challenge?.Description || "Current Challenge";

      hideLoader();
    })
    .catch((err) => {
      console.error("Error fetching challenge data:", err);
      alert("Failed to load challenge data. Please try again.");
      hideLoader();
    });
});
