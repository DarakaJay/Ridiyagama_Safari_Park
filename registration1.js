// Cancel button function
function cancelRegistration() {
    if (confirm("Are you sure you want to cancel registration?")) {
        window.location.href = "index.html";
    }
}

// Form validation (optional)
document.getElementById("registrationForm").addEventListener("submit", function(event) {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        event.preventDefault(); // Stop form submission
    }
});
