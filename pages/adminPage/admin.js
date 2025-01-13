let users = [];
let currentEditingRow = null; // Track the currently editing row

// load all users to the table
function loadUsers() {
  showLoader();
  fetch("/api/admin/getUsers")
    .then((response) => response.json())
    .then((data) => {
      users = data;
      const tbody = document.querySelector("#userTable tbody");
      tbody.innerHTML = "";
      users.forEach((user, index) => {
        tbody.innerHTML += `
          <tr>
            <td>${user.email}</td>
            <td>${user.username}</td>
            <td>${user.birthdate}</td>
            <td>${user.score}</td>
            <td>${user.drawings}</td>
            <td><button class="edit-btn" onclick="editRow(${index})">Edit</button></td>
          </tr>
        `;
      });
      hideLoader();
    })
    .catch((err) => {
      console.error("Error fetching users:", err);
      alert("Failed to load users. Please try again.");
      hideLoader();
    });
}

// after click on "edit", the row will become editable
function editRow(index) {
  if (currentEditingRow !== null && currentEditingRow !== index) {
    // Cancel previous edit if another row is being edited
    const previousRow = document.querySelectorAll("#userTable tbody tr")[
      currentEditingRow
    ];
    const prevUsername = users[currentEditingRow].username;
    const prevBirthdate = users[currentEditingRow].birthdate;
    previousRow.cells[1].innerText = prevUsername;
    previousRow.cells[2].innerText = prevBirthdate;
    previousRow.cells[5].innerHTML = `<button class="edit-btn" onclick="editRow(${currentEditingRow})">Edit</button>`;
  }

  currentEditingRow = index; // Set the current editing row

  const row = document.querySelectorAll("#userTable tbody tr")[index];
  const usernameCell = row.cells[1];
  const birthdateCell = row.cells[2];

  const originalUsername = usernameCell.innerText;
  const originalBirthdate = birthdateCell.innerText;

  usernameCell.innerHTML = `<input type="text" value="${originalUsername}" id="usernameInput${index}">`;
  birthdateCell.innerHTML = `<input type="date" value="${originalBirthdate}" id="birthdateInput${index}">`;

  row.cells[5].innerHTML = `
      <button class="save-btn" onclick="saveChanges(${index})">Save</button>
      <button class="cancel-btn" onclick="cancelChanges(${index}, '${originalUsername}', '${originalBirthdate}')">Cancel</button>
    `;
}

// save the user changes the admin have done
function saveChanges(index) {
  showLoader();
  const updatedUsername = document
    .getElementById(`usernameInput${index}`)
    .value.trim();
  const updatedBirthdate = document.getElementById(
    `birthdateInput${index}`
  ).value;

  const updatedUser = {
    email: users[index].email,
    username: updatedUsername,
    birthdate: updatedBirthdate,
  };

  // send data to server
  fetch("/api/admin/updateUser", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedUser),
  })
    .then((response) => response.json())
    .then(() => {
      showPopup();
      users[index].username = updatedUsername;
      users[index].birthdate = updatedBirthdate;
      currentEditingRow = null;
      loadUsers();
    })
    .catch((err) => {
      console.error("Error updating user:", err);
      alert("Failed to update user. Please try again.");
      hideLoader();
    });
}

// cancel all changes in a row and not save.
function cancelChanges(index, originalUsername, originalBirthdate) {
  const row = document.querySelectorAll("#userTable tbody tr")[index];
  row.cells[1].innerText = originalUsername;
  row.cells[2].innerText = originalBirthdate;
  row.cells[5].innerHTML = `<button class="edit-btn" onclick="editRow(${index})">Edit</button>`;
  currentEditingRow = null;
}

// show the popup on save successfully
function showPopup() {
  const popup = document.getElementById("popup");
  const overlay = document.getElementById("overlay");
  const cancelButton = document.getElementById("cancel-btn");

  popup.style.display = "flex";
  overlay.style.display = "block";

  cancelButton.addEventListener("click", () => {
    popup.style.display = "none";
    overlay.style.display = "none";
  });

  overlay.addEventListener("click", () => {
    popup.style.display = "none";
    overlay.style.display = "none";
  });
}

window.onload = loadUsers;
