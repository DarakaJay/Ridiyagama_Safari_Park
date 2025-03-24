// Add interactivity for form submission
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Simulate login process
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "admin" && password === "password123") {
    alert("Login successful! Redirecting to the homepage...");
    window.location.href = "home4.html"; // Redirect to homepage
  } else {
    alert("Invalid username or password. Please try again.");
  }
});

// Cancel button functionality
document.querySelector(".btn-cancel").addEventListener("click", function () {
  if (confirm("Are you sure you want to cancel?")) {
    if (window.history.length > 1) {
      window.close(); // Close tab if possible
    } else {
      alert("You cannot close the main tab. Please exit manually.");
    }
  }
});
