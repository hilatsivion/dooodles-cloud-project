import { API_BASE_URL } from "../../public/utils.js";
const idToken = sessionStorage.getItem("idToken");
let users = [];
let userToDelete = null; // Track the user selected for deletion

// Load all users to the table
function loadUsers() {
  showLoader();

  fetch(`${API_BASE_URL}/AllUsers?idToken=${idToken}`)
    .then((response) => response.json())
    .then((data) => {
      const responseBody =
        typeof data.body === "string" ? JSON.parse(data.body) : data.body;

      if (responseBody.users) {
        users = responseBody.users;

        const tbody = document.querySelector("#userTable tbody");
        tbody.innerHTML = "";

        users.forEach((user, index) => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${user.Email}</td>
            <td>${user.Username}</td>
            <td>${user.Birthdate || "N/A"}</td>
            <td>${user.TotalScore || 0}</td>
            <td>${user.Doodles ? user.Doodles.length : 0}</td>
            <td><button class="remove-btn">Remove</button></td>
          `;

          tbody.appendChild(row);

          // Add event listener for the Remove button
          row.querySelector(".remove-btn").addEventListener("click", () => {
            userToDelete = user; // Set the user to be deleted
            showDeletePopup();
          });
        });
      } else {
        alert("Failed to load users. Please try again.");
      }

      hideLoader();
    })
    .catch((err) => {
      console.error("Error fetching users:", err);
      alert("Failed to load users. Please try again.");
      hideLoader();
    });
}

// Show the confirmation popup for user deletion
function showDeletePopup() {
  const popup = document.getElementById("delete-popup");
  const overlay = document.getElementById("overlay");
  popup.style.display = "flex";
  overlay.style.display = "block";

  const confirmButton = document.getElementById("delete-btn");
  const cancelButton = document.getElementById("cancel-btn-0");

  // Confirm deletion
  confirmButton.onclick = () => {
    if (userToDelete) {
      deleteUser(userToDelete.Email);
      popup.style.display = "none";
      overlay.style.display = "none";
    }
  };

  // Cancel deletion
  cancelButton.onclick = () => {
    popup.style.display = "none";
    overlay.style.display = "none";
    userToDelete = null;
  };
}

// Delete user function
function deleteUser(email) {
  showLoader();

  fetch(`${API_BASE_URL}/DeleteUser`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Failed to delete user.");
      return response.json();
    })
    .then(() => {
      alert("User deleted successfully.");
      loadUsers();
    })
    .catch((err) => {
      console.error("Error deleting user:", err);
      alert("Failed to delete user. Please try again.");
    })
    .finally(() => {
      hideLoader();
    });
}

window.onload = loadUsers;
