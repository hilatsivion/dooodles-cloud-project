document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector(".form-container");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get values from the form
    const email = loginForm.querySelector('input[type="email"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;

    console.log(`Logging in with ${email} and ${password}`);

    // Store user data in localStorage (this can later be replaced with an API call)
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("username", "User123"); // Replace 'User123' with the actual username from the form

    // Redirect to home page
    window.location.href = "../../pages/homePage";
  });
});
