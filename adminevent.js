// Sample initial events data (in a real application, this would come from a database)
let events = [
  {
    id: 1,
    title: "Animal Feeding Time: Lions",
    date: "2025-02-10",
    description: "Join us for a thrilling lion feeding session at 2 PM. Watch the majestic lions feast while our zookeepers share interesting facts about their behavior and diet.",
    status: "upcoming"
  },
  {
    id: 2,
    title: "Elephant Bathing Show",
    date: "2025-02-15",
    description: "A unique opportunity to witness our elephants enjoying their bath time. Learn about elephant care from our expert trainers.",
    status: "upcoming"
  },
  {
    id: 3,
    title: "Safari Night Tour",
    date: "2025-02-20",
    description: "A guided night safari tour to observe nocturnal animals in action. Limited spots available – book early!",
    status: "upcoming"
  }
];

// DOM Elements
const addEventBtn = document.getElementById('add-event-btn');
const eventModal = document.getElementById('event-modal');
const deleteModal = document.getElementById('delete-modal');
const closeModalBtns = document.querySelectorAll('.close-modal');
const eventForm = document.getElementById('event-form');
const cancelBtn = document.getElementById('cancel-btn');
const eventsTableBody = document.getElementById('events-table-body');
const searchInput = document.getElementById('search-events');
const filterDate = document.getElementById('filter-date');
const cancelDeleteBtn = document.getElementById('cancel-delete-btn');
const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
const modalTitle = document.getElementById('modal-title');

// Current event being edited or deleted
let currentEventId = null;

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  renderEventsTable();
  setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
  // Add event button click
  addEventBtn.addEventListener('click', () => openAddEventModal());
  
  // Close modal buttons
  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', closeAllModals);
  });
  
  // Cancel button in form
  cancelBtn.addEventListener('click', closeAllModals);
  
  // Form submission
  eventForm.addEventListener('submit', saveEvent);
  
  // Search events
  searchInput.addEventListener('input', renderEventsTable);
  
  // Filter events by date
  filterDate.addEventListener('change', renderEventsTable);
  
  // Cancel delete
  cancelDeleteBtn.addEventListener('click', closeAllModals);
  
  // Close modals when clicking outside
  window.addEventListener('click', (event) => {
    if (event.target === eventModal || event.target === deleteModal) {
      closeAllModals();
    }
  });
}

// Render events table with filters applied
function renderEventsTable() {
  const searchTerm = searchInput.value.toLowerCase();
  const dateFilter = filterDate.value;
  
  // Clear table
  eventsTableBody.innerHTML = '';
  
  // Filter events
  const filteredEvents = events.filter(event => {
    // Search filter
    const matchesSearch = event.title.toLowerCase().includes(searchTerm) ||
                        event.description.toLowerCase().includes(searchTerm);
    
    // Date filter
    let matchesDate = true;
    if (dateFilter !== 'all') {
      const today = new Date();
      const eventDate = new Date(event.date);
      
      if (dateFilter === 'upcoming' && eventDate < today) {
        matchesDate = false;
      } else if (dateFilter === 'past' && eventDate >= today) {
        matchesDate = false;
      }
    }
    
    return matchesSearch && matchesDate;
  });
  
  // Render filtered events
  filteredEvents.forEach(event => {
    const row = document.createElement('tr');
    const formattedDate = formatDate(event.date);
    
    // Truncate description if too long
    const shortDesc = event.description.length > 100 ? 
      `${event.description.substring(0, 100)}...` : event.description;
    
    row.innerHTML = `
      <td>${event.id}</td>
      <td>${event.title}</td>
      <td>${formattedDate}</td>
      <td>${shortDesc}</td>
      <td><span class="status-badge status-${event.status}">${capitalizeFirstLetter(event.status)}</span></td>
      <td class="action-buttons">
        <button class="edit-btn" data-id="${event.id}">Edit</button>
        <button class="delete-btn-small" data-id="${event.id}">Delete</button>
      </td>
    `;
    
    eventsTableBody.appendChild(row);
  });
  
  // Add event listeners to edit and delete buttons
  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', () => openEditEventModal(parseInt(btn.getAttribute('data-id'))));
  });
  
  document.querySelectorAll('.delete-btn-small').forEach(btn => {
    btn.addEventListener('click', () => openDeleteConfirmation(parseInt(btn.getAttribute('data-id'))));
  });
}

// Open add event modal
function openAddEventModal() {
  modalTitle.textContent = 'Add New Event';
  eventForm.reset();
  document.getElementById('event-id').value = '';
  eventModal.style.display = 'block';
}

// Open edit event modal
function openEditEventModal(eventId) {
  const event = events.find(e => e.id === eventId);
  if (event) {
    modalTitle.textContent = 'Edit Event';
    document.getElementById('event-id').value = event.id;
    document.getElementById('event-title').value = event.title;
    document.getElementById('event-date').value = event.date;
    document.getElementById('event-description').value = event.description;
    document.getElementById('event-status').value = event.status;
    
    eventModal.style.display = 'block';
  }
}

// Open delete confirmation
function openDeleteConfirmation(eventId) {
  currentEventId = eventId;
  deleteModal.style.display = 'block';
  
  // Set up confirm delete button
  confirmDeleteBtn.onclick = () => {
    deleteEvent(currentEventId);
    closeAllModals();
  };
}

// Close all modals
function closeAllModals() {
  eventModal.style.display = 'none';
  deleteModal.style.display = 'none';
  currentEventId = null;
}

// Save event (add or edit)
function saveEvent(e) {
  e.preventDefault();
  
  const eventId = document.getElementById('event-id').value;
  const eventData = {
    title: document.getElementById('event-title').value,
    date: document.getElementById('event-date').value,
    description: document.getElementById('event-description').value,
    status: document.getElementById('event-status').value
  };
  
  if (eventId) {
    // Update existing event
    const index = events.findIndex(event => event.id === parseInt(eventId));
    if (index !== -1) {
      events[index] = { ...events[index], ...eventData };
      showNotification('Event updated successfully!');
    }
  } else {
    // Add new event
    const newId = events.length > 0 ? Math.max(...events.map(event => event.id)) + 1 : 1;
    events.push({ id: newId, ...eventData });
    showNotification('Event added successfully!');
  }
  
  closeAllModals();
  renderEventsTable();
}

// Delete event
function deleteEvent(eventId) {
  events = events.filter(event => event.id !== eventId);
  renderEventsTable();
  showNotification('Event deleted successfully!');
}

// Show notification
function showNotification(message) {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  
  // Add styles
  notification.style.position = 'fixed';
  notification.style.bottom = '20px';
  notification.style.right = '20px';
  notification.style.backgroundColor = '#1e5631';
  notification.style.color = 'white';
  notification.style.padding = '12px 24px';
  notification.style.borderRadius = '4px';
  notification.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
  notification.style.zIndex = '1000';
  notification.style.transition = 'opacity 0.3s ease';
  
  // Add to body
  document.body.appendChild(notification);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Helper function to format date
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

// Helper function to capitalize first letter
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}