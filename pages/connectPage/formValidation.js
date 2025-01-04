// Email validation function
function validateEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailPattern.test(email);
}

// Password validation function (at least 6 characters)
function validatePassword(password) {
  return password.length >= 6;
}

// Username validation function (non-empty)
function validateUsername(username) {
  return username.trim() !== "";
}

// Form validation for Login and Sign-Up
function validateForm(form) {
  const email = form.querySelector('input[type="email"]').value;
  const username = form.querySelector('input[type="text"]')?.value; // Username is optional for Login
  const password = form.querySelector('input[type="password"]').value;

  // Validate Email
  if (!validateEmail(email)) {
    alert("Please enter a valid email address.");
    return false;
  }

  // Validate Username (Only for Sign-Up)
  if (username && !validateUsername(username)) {
    alert("Username cannot be empty.");
    return false;
  }

  // Validate Password
  if (!validatePassword(password)) {
    alert("Password must be at least 6 characters long.");
    return false;
  }

  return true;
}

// Attach event listener to the form
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector(".login-form");
  const signupForm = document.querySelector(".signup-form");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault(); // Prevent form submission
      if (validateForm(loginForm)) {
        // Proceed with login (form submission or API call)
        console.log("Login successful");
      }
    });
  }

  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault(); // Prevent form submission
      if (validateForm(signupForm)) {
        // Proceed with sign-up (form submission or API call)
        console.log("Sign-up successful");
      }
    });
  }
});
