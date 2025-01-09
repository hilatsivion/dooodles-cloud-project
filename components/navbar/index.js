
// Import Cognito utility functions
import { login, signup, logout, parseTokens, isLoggedIn } from "../../public/utils.js";

document.addEventListener("DOMContentLoaded", function () {
  const navbarContainer = document.getElementById("navbar-container");

  // Check if the user is logged in via Cognito
  const loggedIn = isLoggedIn(); // Checks if tokens exist in localStorage
  const idToken = localStorage.getItem("idToken");
  let username = null;

  // Parse the ID Token to extract the username
  if (idToken) {
    const tokenPayload = JSON.parse(atob(idToken.split(".")[1])); // Decode JWT payload
    username = tokenPayload["cognito:username"] || tokenPayload.email || "User"; // Use the username or email
  }

  if (navbarContainer) {
    // If the user is logged in, update the navbar with the logged-in state
    if (loggedIn) {
      navbarContainer.innerHTML = `
        <div class="nav-links">
          <div class="logo"><a href="../../pages/homePage/index.html">Dooodles</a></div>
          <div class="links-txt">
            <a href="../../pages/homePage/index.html" class="nav-link">Home</a>
            <a href="../../pages/dailyChallenge/index.html" class="nav-link">Daily Challenge</a>
            <a href="../../pages/Leadboard/index.html" class="nav-link">Leader board</a>
            <a href="../../pages/drawingPage/index.html" class="nav-link start-drawing">Start Drawing</a>
          </div>
        </div>
        <div class="auth-buttons">
          <a href="../../pages/profilePage/index.html" class="btn-stroke user-profile">${username}</a>
          <a href="#" class="nav-link log-out">Log out</a>
        </div>
      `;

      const logOutButton = document.querySelector(".log-out");
      logOutButton.addEventListener("click", () => {
        // Log out via Cognito Hosted UI
        logout(); // Calls the logout function from utils.js
      });
    } else {
      // If the user is not logged in, show the default links (Sign up / Login)
      navbarContainer.innerHTML = `
        <div class="nav-links">
          <div class="logo"><a href="../../pages/homePage/index.html">Dooodles</a></div>
          <div class="links-txt">
            <a href="../../pages/homePage/index.html" class="nav-link">Home</a>
            <a href="../../pages/dailyChallenge/index.html" class="nav-link">Daily Challenge</a>
            <a href="../../pages/Leadboard/index.html" class="nav-link">Leader board</a>
          </div>
        </div>
        <div class="auth-buttons">
          <a href="#" class="btn-full create-account signup">Create Account</a>
          <a href="#" class="btn-stroke login">Log In</a>
        </div>
      `;

      // Add event listeners to the login and signup buttons
      const loginButton = document.querySelector(".login");
      const signupButton = document.querySelector(".signup");

      if (loginButton) {
        loginButton.addEventListener("click", () => {
          login(); // Redirects to Cognito Hosted UI login
        });
      }

      if (signupButton) {
        signupButton.addEventListener("click", () => {
          signup(); // Redirects to Cognito Hosted UI signup
        });
      }
    }
  }
});
