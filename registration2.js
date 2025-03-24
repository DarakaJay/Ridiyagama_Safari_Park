document.getElementById('registrationForm').addEventListener('submit', function(event) {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        event.preventDefault();
        alert('Passwords do not match!');
    }
});

function cancelRegistration() {
    window.location.href = 'index.html'; // Redirect to homepage or wherever appropriate
}