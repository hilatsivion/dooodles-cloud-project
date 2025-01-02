// Function to add the 'visible' class to elements when they are in view
document.addEventListener("DOMContentLoaded", () => {
  const fadeInSections = document.querySelectorAll(".fade-in-section");

  const options = {
    root: null, // Use the viewport as the root
    rootMargin: "0px",
    threshold: 0.5, // Trigger when 50% of the element is in view
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // Stop observing once it's in view
      }
    });
  }, options);

  fadeInSections.forEach((section) => {
    observer.observe(section); // Start observing each section
  });
});

// Illustration animation - Pop effect with random delay
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".illustration");

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Apply random delay for each image
        const randomDelay = Math.random() * 1.2; // Random delay between 0 and 3 seconds
        entry.target.style.transitionDelay = `${randomDelay}s`; // Apply the delay to the transition

        entry.target.classList.add("visible"); // Trigger visibility
        observer.unobserve(entry.target); // Stop observing once it's in view
      }
    });
  }, options);

  images.forEach((image) => {
    observer.observe(image); // Start observing each image
  });
});
