document.addEventListener("DOMContentLoaded", function () {
  const navbarContainer = document.getElementById("navbar-container");

  // Check if the user is logged in by verifying the "loggedIn" item in localStorage
  const loggedIn = localStorage.getItem("loggedIn");
  const username = localStorage.getItem("username");

  if (navbarContainer) {
    // If the user is logged in, update the navbar with the logged-in state
    if (loggedIn === "true") {
      navbarContainer.innerHTML = `
        <div class="nav-links">
          <div class="logo"><a href="../../pages/homepage">Dooodles</a></div>
          <div class="links-txt">
            <a href="../../pages/homepage" class="nav-link">Home</a>
            <a href="../../pages/dailyChallenge" class="nav-link">Daily Challenge</a>
            <a href="../../pages/Leadboard" class="nav-link">Leader board</a>
            <a href="../../pages/drawingPage" class="nav-link start-drawing">Start Drawing</a>
          </div>
        </div>
        <div class="auth-buttons">
        <a href="../../pages/profilePage" class="btn-stroke user-profile">${username}</a>
        <a href="../../pages/homePage" class="nav-link log-out">Log out</a>
        </div>
      `;
      const logOutButton = document.querySelector(".log-out");
      logOutButton.addEventListener("click", () => {
        // Remove the user's login state from localStorage
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("username");

        // Redirect to the homepage after logout
        window.location.href = "../../pages/homepage";
      });
    } else {
      // If the user is not logged in, show the default links (Sign up / Login)
      navbarContainer.innerHTML = `
        <div class="nav-links">
          <div class="logo"><a href="../../pages/homepage">Dooodles</a></div>
          <div class="links-txt">
            <a href="../../pages/homepage" class="nav-link">Home</a>
            <a href="../../pages/dailyChallenge" class="nav-link">Daily Challenge</a>
            <a href="../../pages/Leadboard" class="nav-link">Leader board</a>
          </div>
        </div>
        <div class="auth-buttons">
          <a href="../../pages/connectPage/signup.html" class="btn-full create-account">Create Account</a>
          <a href="../../pages/connectPage/login.html" class="btn-stroke login">Log In</a>
        </div>
      `;
    }
  }
});
