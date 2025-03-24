// Form submission and validation
document.getElementById('helpForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const formData = new FormData(this);
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  // Simple validation
  if (name && email && message) {
      fetch('help.php', {
          method: 'POST',
          body: formData
      })
      .then(response => response.text())
      .then(data => {
          alert(data); // Show the message from PHP
          if (data.includes('successfully')) {
              // Clear form after successful submission
              document.getElementById('helpForm').reset();
          }
      })
      .catch(error => console.error('Error:', error));
  } else {
      alert('Please fill in all fields before submitting.');
  }
});

document.addEventListener('DOMContentLoaded', function() {
  // Variables
  const header = document.getElementById('header');
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav');
  const navItems = document.querySelectorAll('#nav-list li a');

  // Function to handle scroll effects
  function handleScroll() {
      if (window.scrollY > 50) {
          header.classList.add('scrolled');
      } else {
          header.classList.remove('scrolled');
      }
  }

  // Toggle mobile menu
  menuToggle.addEventListener('click', function() {
      nav.classList.toggle('active');
      menuToggle.classList.toggle('active');
  });

  // Add active class to current page link
  navItems.forEach(link => {
      if (link.getAttribute('href') === location.pathname.split('/').pop()) {
          link.classList.add('active');
      }

      // Add hover animation
      link.addEventListener('mouseenter', function() {
          this.querySelector('i').classList.add('fa-bounce');
      });

      link.addEventListener('mouseleave', function() {
          this.querySelector('i').classList.remove('fa-bounce');
      });
  });

  // Scroll effect
  window.addEventListener('scroll', handleScroll);

  // Initialize scroll effect
  handleScroll();

  // Additional effects for smoother animations
  const logoIcon = document.querySelector('.logo-icon');

  // Random animal paw animation
  setInterval(() => {
      logoIcon.classList.add('fa-shake');
      setTimeout(() => {
          logoIcon.classList.remove('fa-shake');
      }, 1000);
  }, 5000);

  // Add scroll indicator
  const scrollIndicator = document.createElement('div');
  scrollIndicator.className = 'scroll-indicator';
  document.body.appendChild(scrollIndicator);

  window.addEventListener('scroll', () => {
      const scrollPercentage = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      scrollIndicator.style.width = `${scrollPercentage}%`;
  });

  // Add CSS for scroll indicator and animations
  const style = document.createElement('style');
  style.textContent = `
      .scroll-indicator {
          position: fixed;
          top: 0;
          left: 0;
          height: 3px;
          background-color: var(--accent-orange);
          z-index: 1001;
          width: 0;
          transition: width 0.3s ease;
      }

      .header.scrolled {
          background-color: var(--dark-green);
          padding: 10px 0;
      }

      .menu-toggle.active span:nth-child(1) {
          transform: translateY(9px) rotate(45deg);
      }

      .menu-toggle.active span:nth-child(2) {
          opacity: 0;
      }

      .menu-toggle.active span:nth-child(3) {
          transform: translateY(-9px) rotate(-45deg);
      }

      .fa-bounce {
          animation: iconBounce 0.6s ease;
      }

      @keyframes iconBounce {
          0%, 20%, 50%, 80%, 100% {
              transform: translateY(0);
          }
          40% {
              transform: translateY(-10px);
          }
          60% {
              transform: translateY(-5px);
          }
      }
  `;
  document.head.appendChild(style);
});
