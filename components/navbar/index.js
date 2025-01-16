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

  // Call parseTokens to ensure session storage is populated
  if (!isLoggedIn()) parseTokens();

  // Check if the user is logged in
  const loggedIn = isLoggedIn();
  const username = sessionStorage.getItem("username");
  const isAdmin = sessionStorage.getItem("isAdmin") === "true";

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
