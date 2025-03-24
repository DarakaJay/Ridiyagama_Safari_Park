// DOM Elements
const userModal = document.getElementById('user-modal');
const deleteModal = document.getElementById('delete-modal');
const userForm = document.getElementById('user-form');
const addUserBtn = document.getElementById('add-user-btn');
const closeModalBtns = document.querySelectorAll('.close-modal');
const cancelUserBtn = document.getElementById('cancel-user-btn');
const cancelDeleteBtn = document.getElementById('cancel-delete-btn');
const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
const userModalTitle = document.getElementById('user-modal-title');
const selectAllUsers = document.getElementById('select-all-users');
const userCheckboxes = document.querySelectorAll('.user-select');
const bulkActionBtns = document.querySelectorAll('.bulk-action-btn');
const avatarInput = document.getElementById('user-avatar');
const avatarFilename = document.getElementById('avatar-filename');
const avatarPreviewImg = document.getElementById('avatar-preview-img');
const searchInput = document.getElementById('search-users');
const filterRole = document.getElementById('filter-role');
const filterStatus = document.getElementById('filter-status');
const sortBy = document.getElementById('sort-by');
const rowsPerPage = document.getElementById('rows-per-page');
const paginationBtns = document.querySelectorAll('.pagination-btn');

// Current user being edited or deleted
let currentUserId = null;
let temporaryAvatarURL = null;

// Sample user data (in a real application, this would come from a database)
let userData = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe',
    email: 'john.doe@example.com',
    role: 'admin',
    status: 'active',
    lastLogin: 'Today, 08:45 AM',
    joinedDate: 'Jan 15, 2023',
    avatar: 'avatars/admin1.jpg'
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    username: 'janesmith',
    email: 'jane.smith@example.com',
    role: 'manager',
    status: 'active',
    lastLogin: 'Today, 10:12 AM',
    joinedDate: 'Mar 20, 2023',
    avatar: 'avatars/manager1.jpg'
  },
  // Additional user data would be here...
];

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  updateBulkActionState();
});

// Setup event listeners
function setupEventListeners() {
  // Add user button click
  addUserBtn.addEventListener('click', () => openAddUserModal());
  
  // Close modal buttons
  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', closeAllModals);
  });
  
  // Cancel button in form
  cancelUserBtn.addEventListener('click', closeAllModals);
  
  // Form submission
  userForm.addEventListener('submit', saveUser);
  
  // Select all checkbox
  selectAllUsers.addEventListener('change', toggleSelectAll);
  
  // Individual checkboxes
  userCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateBulkActionState);
  });
  
  // Avatar file input change
  avatarInput.addEventListener('change', handleAvatarSelect);
  
  // Search input
  searchInput.addEventListener('input', filterUsers);
  
  // Filter and sort controls
  filterRole.addEventListener('change', filterUsers);
  filterStatus.addEventListener('change', filterUsers);
  sortBy.addEventListener('change', filterUsers);
  
  // Rows per page
  rowsPerPage.addEventListener('change', updateRowsPerPage);
  
  // Pagination buttons
  paginationBtns.forEach(btn => {
    if (!btn.disabled && !btn.classList.contains('active')) {
      btn.addEventListener('click', () => changePage(btn));
    }
  });
  
  // Edit buttons
  document.querySelectorAll('.btn-edit').forEach(btn => {
    btn.addEventListener('click', () => {
      const userId = parseInt(btn.closest('tr').querySelector('.user-select').getAttribute('data-id') || btn.getAttribute('data-id'));
      openEditUserModal(userId);
    });
  });
  
  // Delete buttons
  document.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', () => {
      const userId = parseInt(btn.closest('tr').querySelector('.user-select').getAttribute('data-id') || btn.getAttribute('data-id'));
      openDeleteConfirmation(userId);
    });
  });
  
  // View profile buttons
  document.querySelectorAll('.btn-view').forEach(btn => {
    btn.addEventListener('click', () => {
      const userId = parseInt(btn.closest('tr').querySelector('.user-select').getAttribute('data-id') || btn.getAttribute('data-id'));
      viewUserProfile(userId);
    });
  });
  
  // Bulk action buttons
  document.getElementById('activate-selected').addEventListener('click', () => bulkChangeStatus('active'));
  document.getElementById('deactivate-selected').addEventListener('click', () => bulkChangeStatus('inactive'));
  document.getElementById('delete-selected').addEventListener('click', confirmBulkDelete);
  
  // Close modals when clicking outside
  window.addEventListener('click', (event) => {
    if (event.target === userModal || event.target === deleteModal) {
      closeAllModals();
    }
  });
}

// Handle avatar file selection
function handleAvatarSelect(event) {
  const fileInput = event.target;
  if (fileInput.files && fileInput.files[0]) {
    const file = fileInput.files[0];
    
    // Update filename display
    avatarFilename.textContent = file.name;
    
    // Create a temporary URL for preview
    if (temporaryAvatarURL) {
      URL.revokeObjectURL(temporaryAvatarURL);
    }
    temporaryAvatarURL = URL.createObjectURL(file);
    avatarPreviewImg.src = temporaryAvatarURL;
  }
}

// Toggle select all checkboxes
function toggleSelectAll() {
  const isChecked = selectAllUsers.checked;
  userCheckboxes.forEach(checkbox => {
    checkbox.checked = isChecked;
  });
  updateBulkActionState();
}

// Update the state of bulk action buttons based on selections
function updateBulkActionState() {
  const anySelected = Array.from(userCheckboxes).some(checkbox => checkbox.checked);
  
  bulkActionBtns.forEach(btn => {
    btn.disabled = !anySelected;
    if (anySelected) {
      btn.classList.remove('disabled');
    } else {
      btn.classList.add('disabled');
    }
  });
}

// Filter users