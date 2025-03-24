document.getElementById("registrationForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent default form submission

  const fullName = document.getElementById("fullName").value;
  const email = document.getElementById("email").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword") ? document.getElementById("confirmPassword").value : password;

  // Basic validation
  if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
  }

  // Create form data to send to PHP
  const formData = new FormData(this);

  fetch("register.php", {
      method: "POST",
      body: formData
  })
  .then(response => response.text())
  .then(data => {
      alert(data); // Display success or error message
      if (data.includes("Registration successful")) {
          window.location.href = "login.html"; // Redirect to login page after success
      }
  })
  .catch(error => console.error("Error:", error));
});

// Cancel button functionality
document.querySelector(".btn-cancel").addEventListener("click", function() {
  if (confirm("Are you sure you want to cancel?")) {
      window.location.href = "home4.html"; // Redirect to homepage or another page
  }
});

// This function can be used for any additional cancel actions
function cancelRegistration() {
  window.location.href = "cancel.html"; // Redirect to a specific cancel page
}
