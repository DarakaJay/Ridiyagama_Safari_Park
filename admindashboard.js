document.addEventListener('DOMContentLoaded', function() {
    // Initialize charts
    initializeVisitorChart();
    initializeAttractionsChart();
    
    // Add event listeners
    setupEventListeners();
    
    // Initialize notifications dropdown
    initializeNotifications();
    
    // Initialize admin profile dropdown
    initializeAdminProfile();
  });
  
  // Set up event listeners
  function setupEventListeners() {
    // Navigation item click
    const navItems = document.querySelectorAll('.admin-nav li a');
    navItems.forEach(item => {
      item.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all items
        navItems.forEach(navItem => {
          navItem.parentElement.classList.remove('active');
        });
        
        // Add active class to clicked item
        this.parentElement.classList.add('active');
        
        // Show section based on href attribute
        const targetId = this.getAttribute('href').substring(1);
        console.log(`Navigating to section: ${targetId}`);
        // In a complete implementation, this would show/hide sections
      });
    });
    
    // Add event button
    const addEventBtn = document.querySelector('.btn-add-event');
    if (addEventBtn) {
      addEventBtn.addEventListener('click', function() {
        console.log('Add new event clicked');
        // In a complete implementation, this would open a modal to add an event
        alert('Event creation form would open here.');
      });
    }
    
    // Action buttons in tables
    const actionButtons = document.querySelectorAll('.btn-view, .btn-edit, .btn-delete');
    actionButtons.forEach(button => {
      button.addEventListener('click', function() {
        const action = this.classList.contains('btn-view') ? 'view' : 
                       this.classList.contains('btn-edit') ? 'edit' : 'delete';
        const eventName = this.closest('tr').querySelector('td:first-child').textContent;
        
        console.log(`${action} action for ${eventName}`);
        
        if (action === 'delete') {
          if (confirm(`Are you sure you want to delete the event "${eventName}"?`)) {
            console.log(`Confirmed: Delete ${eventName}`);
            // In a complete implementation, this would delete the event
          }
        } else if (action === 'edit') {
          alert(`Edit form for "${eventName}" would open here.`);
        } else {
          alert(`Viewing details for "${eventName}"`);
        }
      });
    });
    
    // Search functionality
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
          const searchTerm = this.value.trim();
          if (searchTerm) {
            console.log(`Searching for: ${searchTerm}`);
            alert(`Search results for "${searchTerm}" would display here.`);
          }
        }
      });
    }
  }
  
  // Initialize visitor chart
  function initializeVisitorChart() {
    const ctx = document.getElementById('visitor-chart');
    if (!ctx) return;
    
    const visitorChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Visitors (2024)',
          data: [1200, 1900, 2300, 2800, 2400, 2100, 3200, 3800, 3100, 2700, 2400, 2800],
          borderColor: '#3498db',
          backgroundColor: 'rgba(52, 152, 219, 0.1)',
          tension: 0.3,
          fill: true
        }, {
          label: 'Visitors (2023)',
          data: [1000, 1500, 1800, 2200, 2000, 1800, 2600, 3200, 2800, 2300, 2100, 2400],
          borderColor: '#9b59b6',
          backgroundColor: 'rgba(155, 89, 182, 0.1)',
          tension: 0.3,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            mode: 'index',
            intersect: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              drawBorder: false
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });
  }
  
  // Initialize attractions chart
  function initializeAttractionsChart() {
    const ctx = document.getElementById('attractions-chart');
    if (!ctx) return;
    
    const attractionsChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Safari Drive', 'Lion Exhibit', 'Elephant Zone', 'Giraffe Area', 'Bird Sanctuary'],
        datasets: [{
          data: [35, 25, 20, 15, 5],
          backgroundColor: [
            '#3498db',
            '#e74c3c',
            '#2ecc71',
            '#f39c12',
            '#9b59b6'
          ],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
          }
        },
        cutout: '65%'
      }
    });
  }
  
  // Initialize notifications dropdown
  function initializeNotifications() {
    const notificationsIcon = document.querySelector('.notifications');
    if (notificationsIcon) {
      notificationsIcon.addEventListener('click', function() {
        console.log('Notifications clicked');
        alert('Notifications panel would open here with 3 new notifications.');
      });
    }
  }
  
  // Initialize admin profile dropdown
  function initializeAdminProfile() {
    const adminProfile = document.querySelector('.admin-profile');
    if (adminProfile) {
      adminProfile.addEventListener('click', function() {
        console.log('Admin profile clicked');
        alert('Admin profile dropdown would open here with options like Profile, Settings, and Logout.');
      });
    }
  }
  
  // Responsive sidebar toggle
  function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (sidebar.style.width === '250px' || !sidebar.style.width) {
      sidebar.style.width = '70px';
      mainContent.style.marginLeft = '70px';
    } else {
      sidebar.style.width = '250px';
      mainContent.style.marginLeft = '250px';
    }
  }
  
  // Mock function for data loading
  function loadData(section) {
    console.log(`Loading data for ${section} section`);
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ success: true, message: `Data for ${section} loaded` });
      }, 1000);
    });
  }
  
  // Example of data update function
  function updateStats() {
    const statElements = document.querySelectorAll('.stat-number');
    const changes = ['+', '-', '='];
    const changeClasses = ['positive', 'negative', 'neutral'];
    
    statElements.forEach(stat => {
      // This would be replaced with actual data in a real implementation
      const randomChange = Math.floor(Math.random() * 3);
      const randomPercent = Math.floor(Math.random() * 15);
      
      const parentCard = stat.closest('.stat-card');
      const changeElement = parentCard.querySelector('.stat-change');
      
      if (changeElement) {
        const icon = changes[randomChange] === '+' ? 'fa-arrow-up' : 
                    changes[randomChange] === '-' ? 'fa-arrow-down' : 'fa-minus';
        
        changeElement.innerHTML = `<i class="fas ${icon}"></i> ${randomPercent}% since last month`;
        
        // Update class for styling
        changeElement.className = 'stat-change ' + changeClasses[randomChange];
      }
    });
  }
  
  // Content Management Section
  function initializeContentManagement() {
    const contentSection = document.getElementById('content');
    if (!contentSection) return;
    
    // Set up WYSIWYG editor for page content
    setupContentEditor();
    
    // Load existing pages for editing
    loadExistingPages();
  }
  
  function setupContentEditor() {
    console.log('Setting up content editor');
    // This would integrate a WYSIWYG editor like TinyMCE, CKEditor, etc.
    // For this mock implementation, we'll just log the setup
  }
  
  function loadExistingPages() {
    // Mock data for existing pages
    const pages = [
      { id: 1, title: 'Home Page', lastEdited: '2025-03-10', status: 'Published' },
      { id: 2, title: 'About Us', lastEdited: '2025-03-05', status: 'Published' },
      { id: 3, title: 'Safari Experience', lastEdited: '2025-03-01', status: 'Draft' },
      { id: 4, title: 'Conservation Efforts', lastEdited: '2025-02-28', status: 'Published' },
      { id: 5, title: 'Visitor Guidelines', lastEdited: '2025-02-25', status: 'Review' }
    ];
    
    console.log('Loaded existing pages:', pages);
    // In a real implementation, this would populate a table with the pages
  }
  
  // User Management Section
  function initializeUserManagement() {
    const userSection = document.getElementById('users');
    if (!userSection) return;
    
    // Load user list
    loadUserList();
    
    // Set up role management
    setupRoleManagement();
  }
  
  function loadUserList() {
    // Mock data for users
    const users = [
      { id: 1, username: 'admin', email: 'admin@safari.com', role: 'Administrator', lastLogin: '2025-03-12' },
      { id: 2, username: 'john_manager', email: 'john@safari.com', role: 'Content Manager', lastLogin: '2025-03-11' },
      { id: 3, username: 'sarah_events', email: 'sarah@safari.com', role: 'Event Manager', lastLogin: '2025-03-10' },
      { id: 4, username: 'mike_gallery', email: 'mike@safari.com', role: 'Gallery Manager', lastLogin: '2025-03-09' },
      { id: 5, username: 'lisa_support', email: 'lisa@safari.com', role: 'Support Staff', lastLogin: '2025-03-08' }
    ];
    
    console.log('Loaded user list:', users);
    // In a real implementation, this would populate a table with the users
  }
  
  function setupRoleManagement() {
    // Mock data for roles
    const roles = [
      { id: 1, name: 'Administrator', permissions: ['all'] },
      { id: 2, name: 'Content Manager', permissions: ['edit_content', 'publish_content', 'view_analytics'] },
      { id: 3, name: 'Event Manager', permissions: ['manage_events', 'view_bookings', 'view_analytics'] },
      { id: 4, name: 'Gallery Manager', permissions: ['upload_media', 'manage_gallery', 'view_analytics'] },
      { id: 5, name: 'Support Staff', permissions: ['view_bookings', 'view_events', 'view_content'] }
    ];
    
    console.log('Loaded role definitions:', roles);
    // In a real implementation, this would populate a role management interface
  }
  
  // Event Management Section
  function initializeEventManagement() {
    const eventSection = document.getElementById('events');
    if (!eventSection) return;
    
    // Load events calendar
    loadEventsCalendar();
    
    // Load bookings
    loadEventBookings();
  }
  
  function loadEventsCalendar() {
    console.log('Initializing events calendar');
    // This would integrate a calendar library like FullCalendar
    // For this mock implementation, we'll just log the initialization
  }
  
  function loadEventBookings() {
    // Mock data for event bookings
    const bookings = [
      { id: 1, event: 'Safari Night Tour', date: '2025-03-15', bookedBy: 'John Smith', participants: 2, status: 'Confirmed' },
      { id: 2, event: 'Wildlife Photography Workshop', date: '2025-03-18', bookedBy: 'Emma Jones', participants: 1, status: 'Confirmed' },
      { id: 3, event: 'Conservation Talk', date: '2025-03-22', bookedBy: 'Michael Brown', participants: 3, status: 'Pending' },
      { id: 4, event: 'Safari Night Tour', date: '2025-03-15', bookedBy: 'David Wilson', participants: 4, status: 'Confirmed' },
      { id: 5, event: 'Wildlife Photography Workshop', date: '2025-03-18', bookedBy: 'Sarah Taylor', participants: 2, status: 'Cancelled' }
    ];
    
    console.log('Loaded event bookings:', bookings);
    // In a real implementation, this would populate a table with the bookings
  }
  
  // Gallery Management Section
  function initializeGalleryManagement() {
    const gallerySection = document.getElementById('gallery');
    if (!gallerySection) return;
    
    // Set up media uploader
    setupMediaUploader();
    
    // Load existing media
    loadExistingMedia();
  }
  
  function setupMediaUploader() {
    console.log('Setting up media uploader');
    // This would integrate a file upload system
    // For this mock implementation, we'll just log the setup
  }
  
  function loadExistingMedia() {
    // Mock data for existing media
    const media = [
      { id: 1, filename: 'lion_pride.jpg', uploaded: '2025-03-10', size: '2.4 MB', type: 'image/jpeg' },
      { id: 2, filename: 'elephant_herd.jpg', uploaded: '2025-03-05', size: '3.1 MB', type: 'image/jpeg' },
      { id: 3, filename: 'safari_video.mp4', uploaded: '2025-03-01', size: '48.7 MB', type: 'video/mp4' },
      { id: 4, filename: 'giraffe_family.jpg', uploaded: '2025-02-28', size: '2.8 MB', type: 'image/jpeg' },
      { id: 5, filename: 'zebra_crossing.jpg', uploaded: '2025-02-25', size: '1.9 MB', type: 'image/jpeg' }
    ];
    
    console.log('Loaded existing media:', media);
    // In a real implementation, this would populate a gallery view
  }
  
  // Settings Section
  function initializeSettings() {
    const settingsSection = document.getElementById('settings');
    if (!settingsSection) return;
    
    // Load site settings
    loadSiteSettings();
    
    // Load backup options
    loadBackupOptions();
  }
  
  function loadSiteSettings() {
    // Mock data for site settings
    const settings = {
      siteName: 'Ridiyagama Safari Park',
      siteDescription: 'Experience the wild in Sri Lanka\'s premier safari park',
      contactEmail: 'info@ridiyagamasafari.lk',
      contactPhone: '+0472 030 300',
      openingHours: 'Monday to Sunday: 6:30 AM - 5:30 PM',
      socialLinks: {
        facebook: 'https://facebook.com/RidiyagamaSafariPark',
        instagram: 'https://instagram.com/ridiyagamasafaripark',
        twitter: 'https://twitter.com/RidiyagamaSafari'
      },
      analyticsId: 'UA-12345678-9',
      maintenanceMode: false
    };
    
    console.log('Loaded site settings:', settings);
    // In a real implementation, this would populate a settings form
  }
  
  function loadBackupOptions() {
    console.log('Loading backup and restore options');
    // This would show backup history and provide restore options
    // For this mock implementation, we'll just log the loading
  }
  
  // Dashboard refresh functionality
  function setupDashboardRefresh() {
    // Auto-refresh dashboard data every 5 minutes
    setInterval(() => {
      console.log('Auto-refreshing dashboard data');
      updateStats();
      
      // Refresh charts
      if (window.visitorChart) {
        window.visitorChart.data.datasets[0].data = window.visitorChart.data.datasets[0].data.map(
          value => value * (0.95 + Math.random() * 0.1)
        );
        window.visitorChart.update();
      }
      
      if (window.attractionsChart) {
        window.attractionsChart.data.datasets[0].data = window.attractionsChart.data.datasets[0].data.map(
          value => value * (0.95 + Math.random() * 0.1)
        );
        window.attractionsChart.update();
      }
    }, 300000); // 5 minutes
  }
  
  // Initialize additional modules based on URL hash
  function initializeModuleFromHash() {
    const hash = window.location.hash.substring(1);
    if (!hash) return;
    
    console.log(`Initializing module from hash: ${hash}`);
    
    switch (hash) {
      case 'content':
        initializeContentManagement();
        break;
      case 'users':
        initializeUserManagement();
        break;
      case 'events':
        initializeEventManagement();
        break;
      case 'gallery':
        initializeGalleryManagement();
        break;
      case 'settings':
        initializeSettings();
        break;
      default:
        // Dashboard is the default view
        break;
    }
  }
  
  // Handle responsive design
  function handleResponsiveDesign() {
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'sidebar-toggle';
    toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('.dashboard-header').prepend(toggleBtn);
    
    toggleBtn.addEventListener('click', toggleSidebar);
    
    // Handle window resize
    window.addEventListener('resize', function() {
      if (window.innerWidth < 992) {
        const sidebar = document.querySelector('.sidebar');
        const mainContent = document.querySelector('.main-content');
        
        if (sidebar.style.width !== '70px') {
          sidebar.style.width = '70px';
          mainContent.style.marginLeft = '70px';
        }
      }
    });
  }
  
  // Initialize on page load
  window.addEventListener('load', function() {
    // Set up dashboard refresh
    setupDashboardRefresh();
    
    // Initialize module based on URL hash
    initializeModuleFromHash();
    
    // Handle URL hash changes
    window.addEventListener('hashchange', initializeModuleFromHash);
    
    // Handle responsive design
    handleResponsiveDesign();
    
    // Update initial stats
    updateStats();
    
    console.log('Admin dashboard initialized');
  });
  
  // Export for testing (if needed)
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      initializeVisitorChart,
      initializeAttractionsChart,
      updateStats,
      loadData
    };
  }