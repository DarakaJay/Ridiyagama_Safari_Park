// Function to show a notification with event details
function notifyEvent(eventId) {
  const event = document.getElementById(eventId);
  const eventName = event.querySelector('h3').textContent;
  const eventDate = event.querySelector('.date').textContent;
  const eventDescription = event.querySelector('.description').textContent;

  // Additional information for each event
  const extraInfo = {
    'event1': 'Location: Lion Habitat | Duration: 1 Hour | Suitable for all ages.',
    'event2': 'Location: Elephant Pool | Duration: 45 Mins | Interactive session available.',
    'event3': 'Location: Safari Trail | Duration: 2 Hours | Includes night vision gear.'
  };

  const eventExtraDetails = extraInfo[eventId] || 'More details available on the website.';

  // Create notification container if it doesn't exist
  let notificationContainer = document.getElementById('notification-container');
  if (!notificationContainer) {
    notificationContainer = document.createElement('div');
    notificationContainer.id = 'notification-container';
    notificationContainer.style.position = 'fixed';
    notificationContainer.style.bottom = '20px';
    notificationContainer.style.right = '20px';
    notificationContainer.style.width = '300px';
    notificationContainer.style.maxHeight = '400px';
    notificationContainer.style.overflowY = 'auto';
    notificationContainer.style.zIndex = '1000';
    document.body.appendChild(notificationContainer);
  }

  // Create notification box
  const notification = document.createElement('div');
  notification.className = 'event-notification';
  notification.style.backgroundColor = '#fff';
  notification.style.padding = '15px';
  notification.style.marginBottom = '10px';
  notification.style.border = '1px solid #ccc';
  notification.style.borderRadius = '5px';
  notification.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';

  // Add event details to notification
  notification.innerHTML = `
    <strong>${eventName}</strong><br>
    <em>${eventDate}</em><br>
    <p>${eventDescription}</p>
    <p><strong>Additional Info:</strong> ${eventExtraDetails}</p>
    <button onclick="this.parentElement.remove()" style="background:red;color:white;border:none;padding:5px 10px;margin-top:5px;cursor:pointer;">Close</button>
  `;

  // Append notification to the container
  notificationContainer.appendChild(notification);
}



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
  
  // Initialize
  handleScroll();
  
  // Add additional effects for smoother animations
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
  
  // Add CSS for scroll indicator
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