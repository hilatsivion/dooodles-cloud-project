// Import Cognito utility functions
import {
  login,
  signup,
  logout,
  parseTokens,
  isLoggedIn,
} from "../../public/utils.js";

document.addEventListener("DOMContentLoaded", function () {
  const navbarContainer = document.getElementById("navbar-container");

  // Check if the user is logged in
  const loggedIn = isLoggedIn();
  const idToken = localStorage.getItem("idToken");
  let username = null;
  let isAdmin = false;

  // Parse the ID Token to extract username and admin role
  if (idToken) {
    const tokenPayload = JSON.parse(atob(idToken.split(".")[1])); // Decode JWT payload
    username = tokenPayload["cognito:username"] || tokenPayload.email || "User";
    isAdmin = tokenPayload["custom:isAdmin"] === "true" || username === "admin";
  }

  if (navbarContainer) {
    if (!loggedIn) {
      loadGuestNavbar(navbarContainer);
    } else if (isAdmin) {
      loadAdminNavbar(navbarContainer, username);
    } else {
      loadUserNavbar(navbarContainer, username);
    }
  }
});

/* 🟠 Navbar for NOT Logged-in Users */
function loadGuestNavbar(container) {
  container.innerHTML = `
    <div class="nav-links">
      <div class="logo"><a href="../../pages/homePage/index.html">Dooodles</a></div>
      <div class="links-txt">
        <a href="../../pages/homePage/index.html" class="nav-link">Home</a>
        <a href="../../pages/dailyChallenge/index.html" class="nav-link">Daily Challenge</a>
        <a href="../../pages/Leadboard/index.html" class="nav-link">Leader board</a>
      </div>
    </div>
    <div class="auth-buttons">
      <a href="#" class="btn-full create-account signup">Create account</a>
      <a href="#" class="btn-stroke login">Log in</a>
    </div>
  `;

  document.querySelector(".login").addEventListener("click", login);
  document.querySelector(".signup").addEventListener("click", signup);
}

/* 🟢 Navbar for Logged-in Regular Users */
function loadUserNavbar(container, username) {
  container.innerHTML = `
    <div class="nav-links">
      <div class="logo"><a href="../../pages/homePage/index.html">Dooodles</a></div>
      <div class="links-txt">
        <a href="../../pages/homePage/index.html" class="nav-link">Home</a>
        <a href="../../pages/dailyChallenge/index.html" class="nav-link">Daily Challenge</a>
        <a href="../../pages/Leadboard/index.html" class="nav-link">Leader board</a>
        <a href="../../pages/drawingPage/index.html" class="nav-link">Start Drawing</a>
      </div>
    </div>
    <div class="auth-buttons">
      <a href="../../pages/profilePage/index.html" class="btn-stroke user-profile">${username}</a>
      <span>|</span>
      <a href="#" class="nav-link log-out">Log out</a>
    </div>
  `;

  document.querySelector(".log-out").addEventListener("click", logout);
}

/* 🔴 Navbar for Admin Users */
function loadAdminNavbar(container, username) {
  container.innerHTML = `
    <div class="nav-links">
      <div class="logo"><a href="../../pages/homePage/index.html">Dooodles</a></div>
      <div class="links-txt">
        <a href="../../pages/homePage/index.html" class="nav-link">Home</a>
        <a href="../../pages/Leadboard/index.html" class="nav-link">Leader board</a>
      </div>
    </div>
    <div class="auth-buttons">
      <a href="../../pages/adminPage/index.html" class="btn-stroke btn-stroke">Admin</a>
      <span>|</span>
      <a href="#" class="nav-link log-out">Log out</a>
    </div>
  `;

  document.querySelector(".log-out").addEventListener("click", logout);
}
