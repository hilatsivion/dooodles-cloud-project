document.addEventListener("DOMContentLoaded", function () {
  // Load the navbar into the page
  const navbarContainer = document.getElementById("navbar-container");
  if (navbarContainer) {
    fetch("../components/navbar/navbar.html")
      .then((response) => response.text())
      .then((data) => {
        navbarContainer.innerHTML = data;
      })
      .catch((error) => console.error("Error loading navbar:", error));
  }
});
