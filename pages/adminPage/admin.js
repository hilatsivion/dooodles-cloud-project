const users = [
  {
    email: "hila@gmail.com",
    username: "hila",
    birthdate: "1998-05-12",
    score: 34,
    drawings: 34,
  },
  {
    email: "ran@gmail.com",
    username: "ran",
    birthdate: "1997-08-23",
    score: 23,
    drawings: 11,
  },
  {
    email: "alon@gmail.com",
    username: "alon",
    birthdate: "1999-01-15",
    score: 11,
    drawings: 3,
  },
  {
    email: "gad@gmail.com",
    username: "gad",
    birthdate: "1995-03-30",
    score: 90,
    drawings: 1,
  },
];

function loadUsers() {
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
}

function editRow(index) {
  const row = document.querySelectorAll("#userTable tbody tr")[index];
  const usernameCell = row.cells[1];
  const scoreCell = row.cells[3];

  const originalUsername = usernameCell.innerText;
  const originalScore = scoreCell.innerText;

  usernameCell.innerHTML = `<input type="text" value="${originalUsername}" id="usernameInput${index}">`;
  scoreCell.innerHTML = `<input type="number" value="${originalScore}" id="scoreInput${index}">`;

  row.cells[5].innerHTML = `
        <button class="save-btn" onclick="saveChanges(${index})">Save</button>
        <button class="cancel-btn" onclick="cancelChanges(${index}, '${originalUsername}', ${originalScore})">Cancel</button>
    `;
}

function saveChanges(index) {
  const updatedUsername = document
    .getElementById(`usernameInput${index}`)
    .value.trim();
  const updatedScore = parseInt(
    document.getElementById(`scoreInput${index}`).value.trim(),
    10
  );

  if (isNaN(updatedScore) || updatedScore < 0) {
    alert("Score must be a valid positive number.");
    return;
  }

  const updatedUser = {
    email: users[index].email,
    username: updatedUsername,
    score: updatedScore,
  };

  fetch("/api/admin/updateUser", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedUser),
  })
    .then((response) => response.json())
    .then(() => {
      alert("User updated successfully!");
      users[index].username = updatedUsername;
      users[index].score = updatedScore;
      loadUsers();
    })
    .catch((err) => {
      console.error("Error updating user:", err);
      alert("Failed to update user. Please try again.");
    });
}

function cancelChanges(index, originalUsername, originalScore) {
  const row = document.querySelectorAll("#userTable tbody tr")[index];
  row.cells[1].innerText = originalUsername;
  row.cells[3].innerText = originalScore;
  row.cells[5].innerHTML = `<button class="edit-btn" onclick="editRow(${index})">Edit</button>`;
}

window.onload = loadUsers;
