document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.querySelector(".form-container");

  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get values from the form
    const email = signupForm.querySelector('input[type="email"]').value;
    const username = signupForm.querySelector('input[type="text"]').value;
    const password = signupForm.querySelector('input[type="password"]').value;

    console.log(`Signing up with ${email}, ${username}, and ${password}`);

    // Store user data in localStorage (this can later be replaced with an API call)
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("username", username); // Store the actual username entered

    // Redirect to home page
    window.location.href = "../../pages/homePage";
  });
});
