import { login } from "../../public/utils.js";

// Function to handle page redirection based on login status
function handleRedirect(page) {
  const isLoggedIn = sessionStorage.getItem("idToken") !== null;

  if (isLoggedIn) {
    // Redirect to the intended page
    window.location.href = `../../pages/${page}/index.html`;
  } else {
    // Redirect to the login page
    alert("You must be logged in to access this page!");
    login();
  }
}

// Expose the function to the global scope
window.handleRedirect = handleRedirect;
