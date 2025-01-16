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
