import { API_BASE_URL } from "../../public/utils.js";

document.addEventListener("DOMContentLoaded", () => {
  showLoader();

  const challengeName = document.getElementById("challenge-name");
  challengeName.textContent = sessionStorage.getItem("dailyChallengeTitle");

  //   // Fetch the daily challenge only
  //   fetch(`${API_BASE_URL}/`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     .then((challengeData) => {
  //   })
  //     .then((response) => response.json())

  //       // Update the daily challenge name
  //       challengeName.textContent =
  //         challengeData.challenge?.Description || "Current Challenge";

  //       hideLoader();
  //     })
  //     .catch((err) => {
  //       console.error("Error fetching challenge data:", err);
  //       alert("Failed to load challenge data. Please try again.");
  //       hideLoader();
  //     });
});
