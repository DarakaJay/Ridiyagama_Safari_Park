document.addEventListener('DOMContentLoaded', function() {
  // Variables
  const header = document.getElementById('header');
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('navbar');
  const navItems = document.querySelectorAll('#nav-list li a');
  const logo = document.getElementById('logo');
  const logoutBtn = document.querySelector('.logout-btn');
  
  // Function to handle scroll effects
  function handleScroll() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  
  // Toggle mobile menu
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      nav.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
  }
  
  // Add active class to current page link
  navItems.forEach(link => {
    if (link.getAttribute('href') === location.pathname.split('/').pop()) {
      link.classList.add('active');
    }
    
    // Add hover animation
    link.addEventListener('mouseenter', function() {
      this.querySelector('i')?.classList.add('fa-bounce');
    });
    
    link.addEventListener('mouseleave', function() {
      this.querySelector('i')?.classList.remove('fa-bounce');
    });
  });
  
  // Logo hover effect
  if (logo) {
    logo.parentElement.addEventListener('mouseenter', function() {
      animateLogo();
    });
  }
  
  function animateLogo() {
    logo.classList.add('animated');
    setTimeout(() => {
      logo.classList.remove('animated');
    }, 1000);
  }
  
  // Random logo animation
  setInterval(() => {
    if (Math.random() > 0.7) {
      animateLogo();
    }
  }, 5000);
  
  // Special logout button effect
  if (logoutBtn) {
    logoutBtn.addEventListener('mouseenter', function() {
      this.classList.add('pulse');
      
      // Create a ripple effect
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 1000);
    });
    
    logoutBtn.addEventListener('mouseleave', function() {
      this.classList.remove('pulse');
    });
    
    // Add click feedback
    logoutBtn.addEventListener('click', function(e) {
      // Confirm logout
      if (!confirm('Are you sure you want to logout?')) {
        e.preventDefault();
      } else {
        // Create a flash effect
        const flash = document.createElement('div');
        flash.classList.add('logout-flash');
        document.body.appendChild(flash);
        
        setTimeout(() => {
          flash.remove();
        }, 1000);
      }
    });
  }
  
  // Scroll effect
  window.addEventListener('scroll', handleScroll);
  
  // Initialize
  handleScroll();
  animateLogo(); // Initial animation
  
  // Add scroll indicator
  const scrollIndicator = document.createElement('div');
  scrollIndicator.className = 'scroll-indicator';
  document.body.appendChild(scrollIndicator);
  
  window.addEventListener('scroll', () => {
    const scrollPercentage = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    scrollIndicator.style.width = `${scrollPercentage}%`;
  });
  
  // Add CSS for additional effects
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
      padding: 8px 0;
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
    
    #logo.animated {
      animation: rotateLogo 1s ease-in-out;
    }
    
    @keyframes rotateLogo {
      0% { transform: scale(1); }
      15% { transform: scale(1.1) rotate(-5deg); }
      30% { transform: scale(1.15) rotate(3deg); }
      45% { transform: scale(1.1) rotate(-3deg); }
      60% { transform: scale(1.05) rotate(2deg); }
      75% { transform: scale(1) rotate(0); }
      100% { transform: scale(1); }
    }
    
    .pulse {
      animation: btnPulse 0.5s ease;
    }
    
    @keyframes btnPulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.1); }
      100% { transform: scale(1); }
    }
    
    .ripple {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      width: 10px;
      height: 10px;
      animation: rippleEffect 1s ease-out;
      pointer-events: none;
    }
    
    @keyframes rippleEffect {
      0% {
        width: 0;
        height: 0;
        opacity: 0.8;
      }
      100% {
        width: 200px;
        height: 200px;
        opacity: 0;
      }
    }
    
    .logout-flash {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.8);
      z-index: 9999;
      animation: flashEffect 0.8s forwards;
      pointer-events: none;
    }
    
    @keyframes flashEffect {
      0% { opacity: 0; }
      50% { opacity: 0.8; }
      100% { opacity: 0; }
    }
  `;
  document.head.appendChild(style);
});