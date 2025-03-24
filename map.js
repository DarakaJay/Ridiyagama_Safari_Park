// Initialize the map
const map = L.map('map').setView([6.2858, 80.8915], 15);

// Tile layer (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Layer groups for features
const animalLayer = L.layerGroup();
const trackLayer = L.layerGroup();
const alertLayer = L.layerGroup();

// Function to add animal sightings
const animalSightings = [
  { name: 'Elephants', coords: [6.2865, 80.8920], description: 'A group of elephants spotted here.' },
  { name: 'Lions', coords: [6.2850, 80.8930], description: 'Lions often roam around this area.' }
];

animalSightings.forEach(sighting => {
  L.marker(sighting.coords)
    .bindPopup(`<b>${sighting.name}</b><br>${sighting.description}`)
    .addTo(animalLayer);
});

// Function to track animals
const trackedAnimals = [
  { name: 'Elephants', coords: [6.2865, 80.8920], lastSeen: 'Near the water hole' },
  { name: 'Lions', coords: [6.2850, 80.8930], lastSeen: 'Resting under a tree' }
];

trackedAnimals.forEach(animal => {
  L.marker(animal.coords)
    .bindPopup(`<b>${animal.name}</b><br>Last seen: ${animal.lastSeen}`)
    .addTo(trackLayer);
});

// Function for real-time alerts
const alerts = [
  { message: 'Lion feeding event at 3 PM', coords: [6.2850, 80.8930] },
  { message: 'Elephant sighting near the water hole', coords: [6.2865, 80.8920] }
];

alerts.forEach(alert => {
  L.marker(alert.coords)
    .bindPopup(`<b>Alert:</b><br>${alert.message}`)
    .addTo(alertLayer);
});

// Add GPS map view
const gpsMapLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Sidebar button functionality
document.getElementById('viewGpsMapBtn').addEventListener('click', () => {
  map.eachLayer(layer => {
    if (layer !== gpsMapLayer && layer !== animalLayer && layer !== trackLayer && layer !== alertLayer) {
      map.removeLayer(layer);
    }
  });
  map.addLayer(gpsMapLayer);
});

document.getElementById('animalSightingsBtn').addEventListener('click', () => {
  map.eachLayer(layer => {
    if (layer !== animalLayer && layer !== trackLayer && layer !== alertLayer) {
      map.removeLayer(layer);
    }
  });
  map.addLayer(animalLayer);
});

document.getElementById('trackAnimalsBtn').addEventListener('click', () => {
  map.eachLayer(layer => {
    if (layer !== trackLayer && layer !== animalLayer && layer !== alertLayer) {
      map.removeLayer(layer);
    }
  });
  map.addLayer(trackLayer);
});

document.getElementById('alertsBtn').addEventListener('click', () => {
  map.eachLayer(layer => {
    if (layer !== alertLayer && layer !== animalLayer && layer !== trackLayer) {
      map.removeLayer(layer);
    }
  });
  map.addLayer(alertLayer);
});

// Display a welcome popup
L.popup()
  .setLatLng([6.2858, 80.8915])
  .setContent('<b>Welcome to Ridiyagama Safari Park!</b><br>Explore the map to discover exciting features.')
  .openOn(map);




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