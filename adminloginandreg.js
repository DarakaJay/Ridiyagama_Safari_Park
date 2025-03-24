// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Form switching elements
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const showRegisterLink = document.getElementById('showRegister');
    const showLoginLink = document.getElementById('showLogin');
    
    // Login form elements
    const loginFormElement = document.getElementById('loginFormElement');
    const loginUsername = document.getElementById('loginUsername');
    const loginPassword = document.getElementById('loginPassword');
    
    // Register form elements
    const registerFormElement = document.getElementById('registerFormElement');
    const regName = document.getElementById('regName');
    const regEmail = document.getElementById('regEmail');
    const regUsername = document.getElementById('regUsername');
    const regPassword = document.getElementById('regPassword');
    const regConfirmPassword = document.getElementById('regConfirmPassword');
    const adminRole = document.getElementById('adminRole');
    const passwordStrength = document.getElementById('passwordStrength');
    
    // Animation setup - add entrance animations to form elements
    function addEntranceAnimation(form) {
        const inputs = form.querySelectorAll('input, select, button');
        inputs.forEach((input, index) => {
            input.style.opacity = '0';
            input.style.transform = 'translateY(20px)';
            setTimeout(() => {
                input.style.transition = 'all 0.5s ease';
                input.style.opacity = '1';
                input.style.transform = 'translateY(0)';
            }, 100 * index);
        });
    }
    
    // Initialize with login form animations
    addEntranceAnimation(loginFormElement);
    
    // Form switching functions
    showRegisterLink.addEventListener('click', function(e) {
        e.preventDefault();
        loginForm.style.transform = 'translateX(-100%)';
        loginForm.style.opacity = '0';
        registerForm.style.transform = 'translateX(0)';
        registerForm.style.opacity = '1';
        
        // Reset and animate register form
        registerFormElement.reset();
        addEntranceAnimation(registerFormElement);
    });
    
    showLoginLink.addEventListener('click', function(e) {
        e.preventDefault();
        registerForm.style.transform = 'translateX(100%)';
        registerForm.style.opacity = '0';
        loginForm.style.transform = 'translateX(0)';
        loginForm.style.opacity = '1';
        
        // Reset and animate login form
        loginFormElement.reset();
        addEntranceAnimation(loginFormElement);
    });
    
    // Password strength meter
    regPassword.addEventListener('input', function() {
        const password = this.value;
        let strength = 0;
        
        // Password strength criteria
        if (password.length >= 8) strength += 25;
        if (password.match(/[A-Z]/)) strength += 25;
        if (password.match(/[0-9]/)) strength += 25;
        if (password.match(/[^A-Za-z0-9]/)) strength += 25;
        
        // Update strength meter
        passwordStrength.style.width = '100%';
        passwordStrength.style.display = 'block';
        
        if (strength <= 25) {
            passwordStrength.style.setProperty('--strength-color', '#f44336');
            passwordStrength.style.setProperty('--strength-width', strength + '%');
        } else if (strength <= 50) {
            passwordStrength.style.setProperty('--strength-color', '#FF9800');
            passwordStrength.style.setProperty('--strength-width', strength + '%');
        } else if (strength <= 75) {
            passwordStrength.style.setProperty('--strength-color', '#2196F3');
            passwordStrength.style.setProperty('--strength-width', strength + '%');
        } else {
            passwordStrength.style.setProperty('--strength-color', '#4CAF50');
            passwordStrength.style.setProperty('--strength-width', strength + '%');
        }
        
        // Apply the custom properties
        passwordStrength.style.width = `${strength}%`;
        passwordStrength.style.backgroundColor = 
            strength <= 25 ? '#f44336' : 
            strength <= 50 ? '#FF9800' : 
            strength <= 75 ? '#2196F3' : '#4CAF50';
    });
    
    // Form validation and submission
    loginFormElement.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic validation
        if (!loginUsername.value || !loginPassword.value) {
            showNotification('Please fill all required fields', 'error');
            return;
        }
        
        // Simulate login - would connect to backend in real implementation
        simulateLoading(this.querySelector('button'));
        
        // For demo purposes, we'll just show success and redirect after timeout
        setTimeout(() => {
            showNotification('Login successful! Redirecting to dashboard...', 'success');
            // In a real app, we would redirect to the dashboard
            // window.location.href = 'dashboard.html';
            
            // For demo, reset form and show success animation
            resetButtonState(this.querySelector('button'), 'Login Successful');
            setTimeout(() => {
                this.reset();
                resetButtonState(this.querySelector('button'), 'Login');
            }, 2000);
        }, 1500);
    });
    
    registerFormElement.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic validation
        if (!regName.value || !regEmail.value || !regUsername.value || 
            !regPassword.value || !regConfirmPassword.value || !adminRole.value) {
            showNotification('Please fill all required fields', 'error');
            return;
        }
        
        // Password match validation
        if (regPassword.value !== regConfirmPassword.value) {
            showNotification('Passwords do not match', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(regEmail.value)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate registration - would connect to backend in real implementation
        simulateLoading(this.querySelector('button'));
        
        // For demo purposes, we'll just show success after timeout
        setTimeout(() => {
            showNotification('Registration successful! New admin account created.', 'success');
            
            // Reset form and show success animation
            resetButtonState(this.querySelector('button'), 'Registered Successfully');
            setTimeout(() => {
                // Switch to login form after successful registration
                showLoginLink.click();
            }, 2000);
        }, 1500);
    });
    
    // Helper functions
    function simulateLoading(button) {
        const originalText = button.textContent;
        button.disabled = true;
        button.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Processing...';
        button.classList.add('loading');
    }
    
    function resetButtonState(button, text) {
        button.disabled = false;
        button.textContent = text;
        button.classList.remove('loading');
    }
    
    // Notification system
    function showNotification(message, type) {
        // Remove any existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Add notification to DOM
        document.body.appendChild(notification);
        
        // Add CSS for the notification
        const style = document.createElement('style');
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 8px;
                color: white;
                font-size: 14px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 1000;
                opacity: 0;
                transform: translateY(-20px);
                transition: all 0.3s ease;
                animation: slideIn 0.3s ease forwards;
            }
            
            .notification.success {
                background-color: #4CAF50;
            }
            
            .notification.error {
                background-color: #f44336;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
            }
            
            .notification-content i {
                margin-right: 10px;
                font-size: 18px;
            }
            
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes slideOut {
                from {
                    opacity: 1;
                    transform: translateY(0);
                }
                to {
                    opacity: 0;
                    transform: translateY(-20px);
                }
            }
        `;
        document.head.appendChild(style);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // Add password toggle visibility
    const passwordFields = document.querySelectorAll('input[type="password"]');
    passwordFields.forEach(field => {
        const toggleIcon = document.createElement('i');
        toggleIcon.className = 'fas fa-eye password-toggle';
        toggleIcon.style.position = 'absolute';
        toggleIcon.style.right = '15px';
        toggleIcon.style.top = '50%';
        toggleIcon.style.transform = 'translateY(-50%)';
        toggleIcon.style.cursor = 'pointer';
        toggleIcon.style.color = '#555';
        
        field.parentNode.appendChild(toggleIcon);
        
        toggleIcon.addEventListener('click', () => {
            if (field.type === 'password') {
                field.type = 'text';
                toggleIcon.className = 'fas fa-eye-slash password-toggle';
            } else {
                field.type = 'password';
                toggleIcon.className = 'fas fa-eye password-toggle';
            }
        });
    });
    
    // Add input animation effects
    const allInputs = document.querySelectorAll('input, select');
    allInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentNode.classList.add('input-focus');
            const icon = this.parentNode.querySelector('i:not(.password-toggle)');
            if (icon) {
                icon.style.color = '#4CAF50';
            }
        });
        
        input.addEventListener('blur', function() {
            this.parentNode.classList.remove('input-focus');
            const icon = this.parentNode.querySelector('i:not(.password-toggle)');
            if (icon && !this.value) {
                icon.style.color = '#555';
            }
        });
    });