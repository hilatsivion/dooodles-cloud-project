function showLoader() {
  const loaderContainer = document.getElementById("loader-container");
  loaderContainer.style.visibility = "visible";
}

function hideLoader() {
  const loaderContainer = document.getElementById("loader-container");
  setTimeout(() => {
    loaderContainer.style.visibility = "hidden";
  }, 500); // delay before hiding the loader
}

//
//
//
//
// Example of fetching data from the server and using the loader
function fetchData(url) {
  showLoader(); // Show loader when starting to fetch data

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log("Data received:", data);
      hideLoader(); // Hide loader after data is loaded
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      hideLoader(); // Hide loader even if there's an error
    });

  // Ensure loader stays visible for at least 2 seconds
  setTimeout(() => {
    hideLoader();
  }, 2000);
}

// Example usage:
fetchData("https://api.example.com/data");
